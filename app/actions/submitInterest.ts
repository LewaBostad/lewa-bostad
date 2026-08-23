"use server";

import { z } from "zod";
import { Resend } from "resend";
import { getRealtorEmailsByProjectTitles } from "@/lib/sanity/queries";

const slugSchema = z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9À-ɏ\s\-_]+$/, "Ogiltigt projekturval");

const schema = z.object({
    projects: z.array(slugSchema).min(1, "Välj minst ett projekt"),
    firstName: z.string().min(1, "Ange ditt förnamn"),
    lastName: z.string().min(1, "Ange ditt efternamn"),
    email: z.email("Ange en giltig e-postadress"),
    phone: z.string().optional(),
    gdpr: z.literal("on", {
        error: "Du måste godkänna integritetspolicyn",
    }),
});

export type FormState = {
    success?: boolean;
    errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitInterest(
    _prev: FormState | null,
    formData: FormData,
): Promise<FormState> {
    const result = schema.safeParse({
        projects: formData.getAll("project"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gdpr: formData.get("gdpr"),
    });

    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            errors: Object.fromEntries(
                Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]]),
            ) as FormState["errors"],
        };
    }

    const { firstName, lastName, email, phone, projects } = result.data;

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const server = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !audienceId || !server) {
        console.error("Missing Mailchimp env vars");
        return { errors: { email: "Något gick fel, försök igen senare." } };
    }

    // MD5 hash required by Mailchimp to identify a member
    const crypto = await import("crypto");
    const hash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

    const baseUrl = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hash}`;
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    // Upsert the contact
    const upsertRes = await fetch(baseUrl, {
        method: "PUT",
        headers,
        body: JSON.stringify({
            email_address: email,
            status_if_new: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                PHONE: phone ?? "",
            },
        }),
    });

    if (!upsertRes.ok) {
        console.error("Mailchimp upsert failed:", await upsertRes.text());
        return { errors: { email: "Något gick fel, försök igen senare." } };
    }

    // Apply one tag per selected project
    await fetch(`${baseUrl}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            tags: projects.map((name) => ({ name, status: "active" })),
        }),
    });

    await notifyRealtors({ firstName, lastName, email, phone, projects });

    return { success: true };
}

const FAILURE_ALERT_EMAIL = "sebastian.kullander9@gmail.com";

async function notifyRealtors({
    firstName,
    lastName,
    email,
    phone,
    projects,
}: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    projects: string[];
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.REALTOR_NOTIFICATION_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
        console.error("Missing Resend env vars, skipping realtor notification");
        return;
    }

    const resend = new Resend(apiKey);
    const failures: string[] = [];

    try {
        const rows = await getRealtorEmailsByProjectTitles(projects);

        const results = await Promise.allSettled(
            rows
                .filter((row) => row.realtorEmails && row.realtorEmails.length > 0)
                .map(async (row) => {
                    const { error } = await resend.emails.send({
                        from: `Intresseanmälan <${fromEmail}>`,
                        to: row.realtorEmails as string[],
                        replyTo: email,
                        subject: `Ny intresseanmälan – ${row.title}`,
                        text: [
                            `${firstName} ${lastName} har anmält intresse för ${row.title}.`,
                            "",
                            `E-post: ${email}`,
                            phone ? `Telefon: ${phone}` : undefined,
                        ]
                            .filter(Boolean)
                            .join("\n"),
                        html: realtorNotificationHtml({
                            firstName,
                            lastName,
                            email,
                            phone,
                            projectTitle: row.title,
                        }),
                    });

                    if (error) {
                        throw new Error(`${row.title}: ${error.message}`);
                    }
                }),
        );

        for (const result of results) {
            if (result.status === "rejected") {
                failures.push(
                    result.reason instanceof Error
                        ? result.reason.message
                        : String(result.reason),
                );
            }
        }
    } catch (err) {
        failures.push(err instanceof Error ? err.message : String(err));
    }

    if (failures.length > 0) {
        console.error("Failed to send realtor notification emails:", failures);
        await alertNotificationFailure(resend, fromEmail, failures);
    }
}

async function alertNotificationFailure(
    resend: Resend,
    fromEmail: string,
    failures: string[],
) {
    try {
        const { error } = await resend.emails.send({
            from: `Intresseanmälan <${fromEmail}>`,
            to: FAILURE_ALERT_EMAIL,
            subject: "Fel: mäklaravisering misslyckades",
            text: [
                "En eller flera mäklaraviseringar kunde inte skickas:",
                "",
                ...failures,
            ].join("\n"),
        });

        if (error) {
            throw new Error(error.message);
        }
    } catch (err) {
        console.error("Failed to send realtor notification failure alert:", err);
    }
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function realtorNotificationHtml({
    firstName,
    lastName,
    email,
    phone,
    projectTitle,
}: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    projectTitle: string;
}) {
    const name = escapeHtml(`${firstName} ${lastName}`);
    const title = escapeHtml(projectTitle);

    return `
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #1a1a1a; line-height: 1.5;">
            <p style="margin: 0 0 16px;">
                <strong>${name}</strong> har anmält intresse för <strong>${title}</strong>.
            </p>
            <table style="border-collapse: collapse;">
                <tr>
                    <td style="padding: 4px 12px 4px 0; color: #666;">E-post</td>
                    <td style="padding: 4px 0;">
                        <a href="mailto:${escapeHtml(email)}" style="color: #1a1a1a;">${escapeHtml(email)}</a>
                    </td>
                </tr>
                ${
                    phone
                        ? `<tr>
                    <td style="padding: 4px 12px 4px 0; color: #666;">Telefon</td>
                    <td style="padding: 4px 0;">
                        <a href="tel:${escapeHtml(phone)}" style="color: #1a1a1a;">${escapeHtml(phone)}</a>
                    </td>
                </tr>`
                        : ""
                }
            </table>
        </div>
    `.trim();
}
