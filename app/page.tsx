import Hero from "@/components/sections/hero/Hero";
import ProjectsCTA from "@/components/sections/projectsCTA/ProjectsCTA";
import SplitSection from "@/components/sections/splitSection/SplitSection";
import intro from "@/public/intro/intro.webp";
import { projectCTAData } from "@/components/sections/projectsCTA/data";

export default function Home() {
    return (
        <div>
            <Hero />
            <SplitSection
                title="Omtanke i kvadrat."
                headingLevel="h1"
                text={[
                    "Ett hem är så mycket mer än det som ryms inom fyra väggar. Hemkänsla handlar också om grannar som samlas vid grillen och barn som leker tryggt mellan husen.",
                    "Lewa Bostad bygger arkitektritade radhus och parhus med omsorgsfull design. Men framförallt skapar vi trivsamma kvarter där livet får ta plats – både innanför tröskeln och utanför dörren.",
                ]}
                image={intro}
                imageAlt="Bild på ett vardagsrum ifrång projekt glansbaggen"
                imagePosition="right"
            />
            <ProjectsCTA
                project={projectCTAData[0]}
                project2={projectCTAData[1]}
                background="alt"
                title="Hitta hem hos oss."
                text="Lewa Bostad bygger radhus och parhus i bostadsrättsform. Husen utformas med fokus på hållbar arkitektur, genomtänkt design och hög kvalitet i varje detalj."
            />
        </div>
    );
}
