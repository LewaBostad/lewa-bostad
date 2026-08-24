import { StandardProject } from "@/types/Project.types";
import Hero from "./hero/Hero";
import SplitSection from "../../splitSection/SplitSection";
import FloatingCTA from "@/components/ui/floatingCTA/FloatingCTA";
import RealtorCard from "@/components/ui/realtorCard/RealtorCard";
import styles from "./Underpage.module.css";
import Interest from "../../interest/Interest";

interface UnderpageProps {
    project: StandardProject;
}

export default function Underpage({ project }: UnderpageProps) {
    const hasRealtorCard = Boolean(project.realtorCard?.showRealtorCard && project.realtorCard.fullName);

    return (
        <div>
            <FloatingCTA />
            <Hero project={project} />
            {hasRealtorCard && (
                <div className={styles.realtorCardMobile}>
                    <RealtorCard realtorCard={project.realtorCard} />
                </div>
            )}
            <div className={styles.sections}>
                {project.sections.map((section, index) => (
                    <SplitSection
                        key={section.title}
                        title={section.title}
                        headingLevel="h2"
                        headingSize="h2"
                        text={[section.text]}
                        image={section.image?.src}
                        imageAlt={section.image?.alt}
                        imagePosition={section.imageOrientation}
                        background={index % 2 === 0 ? "default" : "alt"}
                        realtorLink={section.realtorLink}
                        realtorLinkLabel={section.realtorLinkLabel}
                    />
                ))}
            </div>
            <Interest
                type="specific"
                project={project}
                background={project.sections.length % 2 === 0 ? "default" : "alt"}
            />
        </div>
    );
}
