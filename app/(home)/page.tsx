import type { Metadata } from "next";
import Hero from "@/components/sections/hero/Hero";
import ProjectsCTA from "@/components/sections/projectsCTA/ProjectsCTA";
import SplitSection from "@/components/sections/splitSection/SplitSection";
import KeyFigureSection from "@/components/sections/keyfigures/KeyFigureSection";
import AboutCTA from "@/components/sections/aboutCTA/AboutCTA";
import Owners from "@/components/sections/owners/Owners";
import NewsSection from "@/components/sections/news/section/NewsSection";
import { getHomePage, getNewsArticles, blocksToStrings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
    description:
        "Lewa Bostad bygger arkitektritade radhus och parhus med omsorgsfull design i Stockholms förorter – trivsamma kvarter där livet får ta plats.",
    openGraph: {
        title: "Lewa Bostad",
        description:
            "Lewa Bostad bygger arkitektritade radhus och parhus med omsorgsfull design i Stockholms förorter – trivsamma kvarter där livet får ta plats.",
        images: [{ url: "/hero/hero.webp", alt: "Lewa Bostad" }],
    },
};

export default async function Home() {
    const [data, articles] = await Promise.all([
        getHomePage(),
        getNewsArticles(),
    ]);

    const introTextParagraphs = blocksToStrings(data.introText);

    return (
        <div>
            <Hero />
            <SplitSection
                title={data.introTitle}
                headingLevel="h1"
                text={introTextParagraphs}
                image={data.introImage.src}
                imageAlt={data.introImage.alt}
                imagePosition="right"
            />
            <ProjectsCTA
                project={data.projectsCtaProjects[0]}
                project2={data.projectsCtaProjects[1]}
                background="alt"
                title={data.projectsCtaTitle}
                text={data.projectsCtaText}
            />
            <KeyFigureSection
                title={data.keyFiguresTitle}
                text={data.keyFiguresText}
                keyFigures={data.keyFigures}
                background="brand"
            />
            <AboutCTA
                title={[data.aboutTitleLine1, data.aboutTitleLine2]}
                text={data.aboutText}
                textBlocks={data.aboutBlocks}
            />
            <Owners
                quote={data.quote}
                quoteAuthor={data.quoteAuthor}
                imageUrl={data.quoteImage.src}
                imageAlt={data.quoteImage.alt}
            />
            {articles.length > 0 && (
                <NewsSection
                    background="default"
                    articles={articles}
                    referrer="hem"
                />
            )}
        </div>
    );
}
