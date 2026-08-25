import { defineField, defineType } from "sanity";

export const realtorCardType = defineType({
    name: "realtorCard",
    title: "Mäklare",
    type: "object",
    fields: [
        defineField({
            name: "photo",
            title: "Foto",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
            fields: [
                defineField({
                    name: "alt",
                    title: "Alternativ text",
                    type: "string",
                    description: "Beskriv bilden kort",
                }),
            ],
        }),
        defineField({
            name: "fullName",
            title: "Namn",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "company",
            title: "Företag",
            type: "string",
        }),
        defineField({
            name: "phone",
            title: "Telefonnummer",
            type: "string",
        }),
        defineField({
            name: "email",
            title: "E-postadress",
            type: "string",
            validation: (Rule) =>
                Rule.custom((value) => {
                    if (!value) return true;
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailPattern.test(value) ? true : "Ogiltig e-postadress";
                }),
        }),
    ],
    preview: {
        select: { title: "fullName", subtitle: "company", media: "photo" },
        prepare: ({ title, subtitle, media }) => ({
            title: title || "Mäklare",
            subtitle,
            media,
        }),
    },
});
