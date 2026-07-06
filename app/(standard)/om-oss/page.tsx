import type { Metadata } from "next";
import AboutHero from "@/components/sections/aboutHero/AboutHero";
import AboutValues from "@/components/sections/aboutValues/AboutValues";
import SplitSection from "@/components/sections/splitSection/SplitSection";
import { getAboutPage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
    title: "Om oss",
    description:
        "Lewa Bostad är ett bostadsföretag med lång erfarenhet. Vi utvecklar hållbara radhus och parhus med hög kvalitet i varje detalj i Stockholms förorter.",
    openGraph: {
        title: "Om oss – Lewa Bostad",
        description:
            "Lewa Bostad är ett bostadsföretag med lång erfarenhet. Vi utvecklar hållbara radhus och parhus med hög kvalitet i varje detalj i Stockholms förorter.",
        images: [
            {
                url: "/aboutHero/owners.jpg",
                alt: "Grundarna bakom Lewa Bostad",
            },
        ],
    },
};

export default async function About() {
    const data = await getAboutPage();

    return (
        <div>
            <AboutHero
                headingLine1={data.heroHeadingLine1}
                headingLine2={data.heroHeadingLine2}
                text={data.heroText}
                imageUrl={data.heroImage.src}
                imageAlt={data.heroImage.alt}
            />
            <AboutValues
                heading={data.valuesHeading}
                values={data.values}
            />
            {data.sections.map((section, index) => (
                <SplitSection
                    key={index}
                    title={section.title}
                    headingLevel="h2"
                    text={[section.text]}
                    image={section.image.src}
                    imageAlt={section.image.alt}
                    imagePosition={section.imagePosition}
                    background={index % 2 === 0 ? "default" : "alt"}
                />
            ))}
        </div>
    );
}
