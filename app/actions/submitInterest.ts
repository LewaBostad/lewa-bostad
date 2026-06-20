"use server";

import { z } from "zod";

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

    return { success: true };
}
