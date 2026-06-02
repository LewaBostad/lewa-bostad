import AboutHero from "@/components/sections/aboutHero/AboutHero";
import SplitSection from "@/components/sections/splitSection/SplitSection";
import img1 from "@/public/aboutSections/img1.webp";
import img2 from "@/public/aboutSections/img2.webp";
import img3 from "@/public/aboutSections/img3.webp";

export default function About() {
    return (
        <div>
            <AboutHero />
            <SplitSection
                title="Vad bygger vi?"
                headingLevel="h2"
                text={[
                    "Lewa Bostad utvecklar radhus och parhus med bostadsrättsform i Stockholms förorter. Bostäderna har genomtänkta planlösningar med möjlighet till flera sociala ytor och egen trädgård med uteplats. Vi gör även rum för gemenskap och grannsämja mellan husen. Allt för att skapa levande kvarter där människor trivs.",
                ]}
                image={img1}
                imageAlt="Bild ifrån lewas projekt"
                imagePosition="right"
            />
            <SplitSection
                title="Hur bygger vi?"
                headingLevel="h2"
                text={[
                    "För oss är kvalitet aldrig ett tillval. Den sitter i helheten – i ritningen, hantverket och känslan när du kliver in. Vi arbetar med noggrant utvalda leverantörer och material som håller över tid. Det handlar inte om lyx, utan om omtanke och noggrannhet i varje steg. Hållbarhet går som en grön tråd i hela byggprocessen, från val av material till energilösningar och områdesplanering. Det ger hem med lägre klimatavtryck som håller med tiden.",
                ]}
                image={img2}
                imageAlt="Bild ifrån lewas projekt"
                imagePosition="left"
                background="alt"
            />
            <SplitSection
                title="Vem bygger vi för?"
                headingLevel="h2"
                text={[
                    "Våra bostäder är planerade för att passa olika skeden av livet. Allt från växande barnfamiljer som väntar tillökning till par med stora barn som vill byta villalivet mot något mer bekvämt.",
                ]}
                image={img3}
                imageAlt="Bild ifrån lewas projekt"
                imagePosition="right"
            />
        </div>
    );
}
