import { defineField } from "sanity";

/**
 * Optional call-to-action button for featured underpage sections.
 * An editor picks ONE button type (none / realtor link / PDF); only the fields
 * for that type are shown, so a section can never render both buttons.
 *
 * Sections created before `buttonType` existed only have `realtorLink` set –
 * those are treated as "realtor" both here and in the GROQ query.
 */

type ButtonType = "none" | "realtor" | "pdf";

interface ButtonParent {
    buttonType?: ButtonType;
    realtorLink?: string;
}

const resolveButtonType = (parent: unknown): ButtonType => {
    const p = parent as ButtonParent | undefined;
    return p?.buttonType ?? (p?.realtorLink ? "realtor" : "none");
};

export const sectionButtonFieldset = {
    name: "button",
    title: "Knapp (valfri)",
    description: "Visa en knapp efter texten i sektionen. Endast en knapptyp kan väljas åt gången.",
};

export const sectionButtonFields = [
    defineField({
        name: "buttonType",
        title: "Knapptyp",
        type: "string",
        fieldset: "button",
        options: {
            list: [
                { title: "Ingen knapp", value: "none" },
                { title: "Mäklarlänk", value: "realtor" },
                { title: "PDF", value: "pdf" },
            ],
            layout: "radio",
            direction: "horizontal",
        },
        initialValue: "none",
    }),
    defineField({
        name: "realtorLink",
        title: "Mäklarlänk",
        type: "url",
        fieldset: "button",
        description: "Länken öppnas i en ny flik.",
        hidden: ({ parent }) => resolveButtonType(parent) !== "realtor",
        validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).custom((value, context) =>
                resolveButtonType(context.parent) === "realtor" && !value ? "Ange en länk eller välj en annan knapptyp" : true,
            ),
    }),
    defineField({
        name: "realtorLinkLabel",
        title: "Knapptext (valfri)",
        type: "string",
        fieldset: "button",
        description: 'Lämnas den tom visas "Läs mer & kontakt".',
        hidden: ({ parent }) => resolveButtonType(parent) !== "realtor",
    }),
    defineField({
        name: "pdfFile",
        title: "PDF-fil",
        type: "file",
        fieldset: "button",
        description: "Ladda upp en PDF. Den öppnas i en ny flik när besökaren klickar på knappen.",
        options: { accept: "application/pdf" },
        hidden: ({ parent }) => resolveButtonType(parent) !== "pdf",
        validation: (Rule) =>
            Rule.custom((value, context) =>
                resolveButtonType(context.parent) === "pdf" && !(value as { asset?: unknown } | undefined)?.asset
                    ? "Ladda upp en PDF eller välj en annan knapptyp"
                    : true,
            ),
    }),
    defineField({
        name: "pdfLabel",
        title: "Knapptext (valfri)",
        type: "string",
        fieldset: "button",
        description: 'Lämnas den tom visas "Öppna PDF".',
        hidden: ({ parent }) => resolveButtonType(parent) !== "pdf",
    }),
];
