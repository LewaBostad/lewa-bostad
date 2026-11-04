import { defineField, defineType } from "sanity";

/** A button that opens an uploaded PDF in a new tab. Used for the buttons under the realtor cards. */
export const pdfButtonType = defineType({
    name: "pdfButton",
    title: "PDF-knapp",
    type: "object",
    fields: [
        defineField({
            name: "label",
            title: "Knapptext",
            type: "string",
            description: 'Texten som visas i knappen, t.ex. "Infobroschyr" eller "Planritningar".',
            validation: (Rule) => Rule.required().error("Ange en knapptext"),
        }),
        defineField({
            name: "pdfFile",
            title: "PDF-fil",
            type: "file",
            description: "Ladda upp en PDF. Den öppnas i en ny flik när besökaren klickar på knappen.",
            options: { accept: "application/pdf" },
            validation: (Rule) => Rule.required().error("Ladda upp en PDF"),
        }),
    ],
    preview: {
        select: { title: "label", subtitle: "pdfFile.asset.originalFilename" },
        prepare: ({ title, subtitle }) => ({
            title: title || "PDF-knapp",
            subtitle: subtitle || "Ingen PDF uppladdad",
        }),
    },
});
