import { defineArrayMember, defineField, defineType } from "sanity";
import { realtorLinkField, realtorLinkLabelField } from "../fields/realtorLink";

const eyebrowField = defineField({
    name: "eyebrow",
    title: "Ögonbryn / menyetiketten",
    type: "string",
    description:
        'Obligatorisk – används som etiketten i sektionsnavigeringen (menyn). Syns alltid i menyn. Texten visas även ovanför rubriken på sidan om inte "Dölj ögonbryn på sidan" är ikryssad. T.ex. "Projektet" eller "Bostäderna".',
    validation: (Rule) => Rule.required(),
});

const hideEyebrowField = defineField({
    name: "hideEyebrow",
    title: "Dölj ögonbryn på sidan",
    type: "boolean",
    description:
        "Om ikryssad visas ögonbrynet inte ovanför rubriken på sidan, men det används fortfarande som menyetiketten i navigeringen.",
    initialValue: false,
});

export const introSectionType = defineType({
    name: "introSection",
    title: "Inledning",
    type: "object",
    description: "Projektets inledningssektion med faktatåda och statusindikator",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Introduktionstext",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "timelineSteps",
            title: "Tidslinje / projektsteg",
            type: "array",
            description:
                "Stegen som visas i projektets statustidslinje. Markera vilket steg som är aktuellt just nu.",
            of: [
                defineArrayMember({
                    type: "object",
                    name: "timelineStep",
                    fields: [
                        defineField({
                            name: "active",
                            title: "Aktuellt steg",
                            description: "Markera detta som projektets nuvarande steg i tidslinjen",
                            type: "boolean",
                            initialValue: false,
                        }),
                        defineField({
                            name: "topText",
                            title: "Text ovanför punkten",
                            description: 'Valfri. T.ex. "Hösten 2027". Lämna tomt om ingen text ska visas.',
                            type: "string",
                        }),
                        defineField({
                            name: "label",
                            title: "Text under punkten",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: { title: "label", subtitle: "topText", active: "active" },
                        prepare: ({ title, subtitle, active }) => ({
                            title: `${active ? "● " : ""}${title || "Utan text"}`,
                            subtitle,
                        }),
                    },
                }),
            ],
            initialValue: [
                { active: false, topText: "", label: "Projektet inleds" },
                { active: false, topText: "", label: "Pågående produktion" },
                { active: false, topText: "", label: "Förhandsvisning" },
                { active: false, topText: "", label: "Uthyrning börjar" },
                { active: false, topText: "", label: "Inflyttning" },
            ],
            validation: (Rule) =>
                Rule.required()
                    .min(1)
                    .custom((steps) => {
                        if (!steps || steps.length === 0) return true;
                        const activeCount = (steps as { active?: boolean }[]).filter((step) => step.active).length;
                        if (activeCount === 0) return "Markera vilket steg som är aktuellt";
                        if (activeCount > 1) return "Endast ett steg kan vara markerat som aktuellt";
                        return true;
                    }),
        }),
        defineField({
            name: "objectInfo",
            title: "Objektfakta",
            type: "array",
            description: "Faktatåda med projektdetaljer, t.ex. Byggstart, Inflyttning, Antal bostäder",
            of: [defineArrayMember({ type: "objectInfo" })],
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title, subtitle: "Inledning" }),
    },
});

export const sectionTextType = defineType({
    name: "sectionText",
    title: "Textsektion",
    type: "object",
    description: "En sektion med enbart rubrik och brödtext – ingen bild",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Brödtext",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title, subtitle: "Textsektion" }),
    },
});

export const sectionSplitType = defineType({
    name: "sectionSplit",
    title: "Delad sektion (text + bild)",
    type: "object",
    description: "Rubrik och brödtext bredvid en bild",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Brödtext",
            type: "text",
            rows: 6,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Bild (valfri)",
            type: "image",
            description: "Lämna tomt för att visa sektionen utan bild",
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
        defineField({
            name: "imageOrientation",
            title: "Bildens placering",
            type: "string",
            options: {
                list: [
                    { title: "Vänster", value: "left" },
                    { title: "Höger", value: "right" },
                ],
                layout: "radio",
            },
            initialValue: "right",
            validation: (Rule) => Rule.required(),
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title", media: "image" },
        prepare: ({ title, media }) => ({ title, subtitle: "Delad sektion", media }),
    },
});

export const sectionSplitDoubleType = defineType({
    name: "sectionSplitDouble",
    title: "Dubbel bildsektion",
    type: "object",
    description: "Rubrik och text med två bilder bredvid varandra",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Brödtext (valfri)",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "image1",
            title: "Bild 1 (valfri)",
            type: "image",
            description: "Lämna tomt för att visa sektionen utan denna bild",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alternativ text",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "image2",
            title: "Bild 2 (valfri)",
            type: "image",
            description: "Lämna tomt för att visa sektionen utan denna bild",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alternativ text",
                    type: "string",
                }),
            ],
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title", media: "image1" },
        prepare: ({ title, media }) => ({ title, subtitle: "Dubbel bildsektion", media }),
    },
});

export const sectionBulletsType = defineType({
    name: "sectionBullets",
    title: "Punktlistesektion",
    type: "object",
    description: "Rubrik, valfri intro-text och en punktlista",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Introduktionstext (valfri)",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "bulletPoints",
            title: "Punkter",
            type: "array",
            description: "Varje rad är en punkt i listan",
            of: [defineArrayMember({ type: "string" })],
            validation: (Rule) => Rule.required().min(1),
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title, subtitle: "Punktlistesektion" }),
    },
});

export const subSectionType = defineType({
    name: "subSection",
    title: "Undersektion",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Rubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "text",
            title: "Brödtext",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "bulletPoints",
            title: "Punkter (valfria)",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
        }),
    ],
    preview: {
        select: { title: "title" },
    },
});

export const sectionSubsectionsType = defineType({
    name: "sectionSubsections",
    title: "Undersektioner",
    type: "object",
    description: "En huvudrubrik med flera undersektioner (t.ex. Material och detaljer → Kök, Badrum…)",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Huvudrubrik",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subSections",
            title: "Undersektioner",
            type: "array",
            of: [defineArrayMember({ type: "subSection" })],
            validation: (Rule) => Rule.required().min(1),
        }),
        realtorLinkField,
        realtorLinkLabelField,
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title, subtitle: "Undersektioner" }),
    },
});

export const sectionMapType = defineType({
    name: "sectionMap",
    title: "Kartsektion",
    type: "object",
    description: "Visar en interaktiv karta över projektets läge – positionen hämtas från projektets koordinater",
    fields: [
        eyebrowField,
        hideEyebrowField,
        defineField({
            name: "title",
            title: "Rubrik (valfri)",
            type: "string",
        }),
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }) => ({ title: title ?? "Karta", subtitle: "Kartsektion" }),
    },
});
