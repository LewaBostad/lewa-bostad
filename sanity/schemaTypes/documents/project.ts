import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const projectType = defineType({
    name: "project",
    title: "Projekt",
    type: "document",
    groups: [
        { name: "general", title: "Allmänt", default: true },
        { name: "media", title: "Bilder" },
        { name: "content", title: "Innehåll" },
    ],
    fields: [
        orderRankField({ type: "project" }),
        defineField({
            name: "title",
            title: "Projektnamn",
            type: "string",
            group: "general",
            validation: (Rule) => Rule.required().error("Projektnamn krävs"),
        }),
        defineField({
            name: "slug",
            title: "URL-adress",
            type: "slug",
            group: "general",
            description: "Genereras automatiskt från projektnamnet. Ändra inte efter publicering.",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "status",
            title: "Projektstatus",
            type: "string",
            group: "general",
            options: {
                list: [
                    { title: "Planerat", value: "planned" },
                    { title: "Pågående", value: "ongoing" },
                    { title: "Genomfört", value: "completed" },
                ],
                layout: "radio",
            },
            initialValue: "planned",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Ort",
            type: "string",
            group: "general",
            description: 'T.ex. "Nacka" eller "Tumba"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "address",
            title: "Gatuadress (valfri)",
            type: "string",
            group: "general",
            description: 'T.ex. "Kringelkroken 2, Tyresö"',
        }),
        defineField({
            name: "coordinates",
            title: "Kartposition",
            type: "geopoint",
            group: "general",
            description: "Sökmotorn: Klicka på kartan eller ange koordinater för att placera projektet på kartan",
        }),
        defineField({
            name: "realtorEmails",
            title: "Mäklare e-post (avisering)",
            type: "array",
            group: "general",
            description:
                "E-postadresser som får ett meddelande när någon skickar en intresseanmälan för detta projekt. Lägg till en eller flera.",
            of: [defineArrayMember({ type: "string" })],
            validation: (Rule) =>
                Rule.custom((value) => {
                    if (!value || value.length === 0) return true;
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const invalid = value.filter(
                        (email) => typeof email !== "string" || !emailPattern.test(email),
                    );
                    return invalid.length === 0
                        ? true
                        : `Ogiltig e-postadress: ${invalid.join(", ")}`;
                }),
        }),
        defineField({
            name: "realtorCard",
            title: "Mäklarkort",
            type: "realtorCard",
            group: "general",
        }),
        defineField({
            name: "objectInfo",
            title: "Objektfakta",
            type: "array",
            group: "general",
            description: "Faktarader som visas i projektöversikten, t.ex. Byggstart, Inflyttning, Antal bostäder",
            of: [defineArrayMember({ type: "objectInfo" })],
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    if (context.document?.underpageType === "featured") return true;
                    const hasItems = Array.isArray(value) && value.length > 0;
                    const isHidden = context.document?.hideObjectInfo === true;
                    if (!hasItems && !isHidden) {
                        return 'Lägg till minst en objektfakta, eller aktivera "Dölj objektfakta" nedan';
                    }
                    return true;
                }),
        }),
        defineField({
            name: "hideObjectInfo",
            title: "Dölj objektfakta",
            type: "boolean",
            group: "general",
            description: "Aktivera för att visa en platshållartext istället för objektfakta (t.ex. när informationen inte är klar än)",
            initialValue: false,
            hidden: ({ document }) => document?.underpageType === "featured",
        }),
        defineField({
            name: "objectInfoPlaceholder",
            title: "Platshållartext",
            type: "string",
            group: "general",
            description: "Visas istället för objektfakta när ovanstående toggle är aktiverad",
            initialValue: "Mer information kommer snart",
            hidden: ({ document }) => document?.underpageType === "featured" || !document?.hideObjectInfo,
        }),
        defineField({
            name: "thumbnail",
            title: "Omslagsbild",
            type: "image",
            group: "media",
            description: "Visas i projektlistan och vid delning i sociala medier",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alternativ text",
                    type: "string",
                    description: "Beskriv bilden kort",
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "gallery",
            title: "Bildgalleri",
            type: "array",
            group: "media",
            description: "Alla projektbilder som visas i galleriet. Dra för att ändra ordning.",
            of: [
                defineArrayMember({
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alternativ text",
                            type: "string",
                            description: "Beskriv bilden kort",
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "underpageType",
            title: "Undersidetyp",
            type: "string",
            group: "content",
            description: '"Standard" för vanliga projektsidor. "Utvald" för flaggskeppsprojekt med rik layout och fler sektionstyper.',
            options: {
                list: [
                    { title: "Standard", value: "standard" },
                    { title: "Utvald (Featured)", value: "featured" },
                ],
                layout: "radio",
            },
            initialValue: "standard",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "standardSections",
            title: "Sektioner",
            type: "array",
            group: "content",
            description: "Lägg till textblock med bilder. Dra för att ändra ordning.",
            hidden: ({ document }) => document?.underpageType === "featured",
            of: [defineArrayMember({ type: "standardSection" })],
        }),
        defineField({
            name: "featuredSections",
            title: "Sektioner",
            type: "array",
            group: "content",
            description: "Välj sektionstyp och bygg upp projektsidan. Dra för att ändra ordning.",
            hidden: ({ document }) => document?.underpageType !== "featured",
            of: [
                defineArrayMember({ type: "introSection", title: "Inledning" }),
                defineArrayMember({ type: "sectionText", title: "Textsektion" }),
                defineArrayMember({ type: "sectionSplit", title: "Delad sektion (text + bild)" }),
                defineArrayMember({ type: "sectionSplitDouble", title: "Dubbel bildsektion" }),
                defineArrayMember({ type: "sectionBullets", title: "Punktlistesektion" }),
                defineArrayMember({ type: "sectionSubsections", title: "Undersektioner" }),
                defineArrayMember({ type: "sectionMap", title: "Kartsektion" }),
            ],
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "location", media: "thumbnail" },
    },
});
