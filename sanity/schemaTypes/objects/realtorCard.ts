import { defineField, defineType } from "sanity";

export const realtorCardType = defineType({
    name: "realtorCard",
    title: "Mäklarkort",
    type: "object",
    description:
        "Visar ett kort med mäklarens bild och kontaktuppgifter längst upp på projektsidan. Lämna avstängd eller tom för att inte visa något kort.",
    fields: [
        defineField({
            name: "showRealtorCard",
            title: "Visa mäklarkort",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "photo",
            title: "Foto",
            type: "image",
            options: { hotspot: true },
            hidden: ({ parent }) => !(parent as { showRealtorCard?: boolean })?.showRealtorCard,
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
            hidden: ({ parent }) => !(parent as { showRealtorCard?: boolean })?.showRealtorCard,
        }),
        defineField({
            name: "company",
            title: "Företag",
            type: "string",
            hidden: ({ parent }) => !(parent as { showRealtorCard?: boolean })?.showRealtorCard,
        }),
        defineField({
            name: "phone",
            title: "Telefonnummer",
            type: "string",
            hidden: ({ parent }) => !(parent as { showRealtorCard?: boolean })?.showRealtorCard,
        }),
        defineField({
            name: "email",
            title: "E-postadress",
            type: "string",
            hidden: ({ parent }) => !(parent as { showRealtorCard?: boolean })?.showRealtorCard,
            validation: (Rule) =>
                Rule.custom((value) => {
                    if (!value) return true;
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailPattern.test(value) ? true : "Ogiltig e-postadress";
                }),
        }),
    ],
    preview: {
        select: { title: "fullName", subtitle: "company", media: "photo", active: "showRealtorCard" },
        prepare: ({ title, subtitle, media, active }) => ({
            title: title || "Mäklarkort",
            subtitle: active ? subtitle || "Aktivt" : "Avstängt",
            media,
        }),
    },
});
