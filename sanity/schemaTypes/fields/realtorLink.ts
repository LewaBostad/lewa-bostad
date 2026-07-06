import { defineField } from "sanity";

export const realtorLinkField = defineField({
    name: "realtorLink",
    title: "Mäklarlänk (valfri)",
    type: "url",
    description:
        'Lägg till en länk för att visa en knapp efter texten i sektionen. Länken öppnas i en ny flik. Lämna tomt för att inte visa någon knapp.',
    validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
});

export const realtorLinkLabelField = defineField({
    name: "realtorLinkLabel",
    title: "Knapptext (valfri)",
    type: "string",
    description:
        'Texten som visas i knappen ovan. Lämnas den tom visas "Läs mer & kontakt".',
    hidden: ({ parent }) => !(parent as { realtorLink?: string })?.realtorLink,
});
