import { Project } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import ProjectCard from "./projectCard/ProjectCard";
import styles from "./ProjectsCTA.module.css";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

interface ProjectsCTAProps {
    project: Project;
    project2: Project;
    background: Background;
    title: string;
    text: string;
}

export default function ProjectsCTA({
    project,
    project2,
    background,
    title,
    text,
}: ProjectsCTAProps) {
    return (
        <section className={`section section--${background}`}>
            <div className="stack">
                <div className="stack">
                    <h2>{title}</h2>
                    <div className={styles.header}>
                        <p className="prose">{text}</p>
                        <div className={styles.hideMobile}>
                            <PrimaryButton
                                type="link"
                                background="brand"
                                label="Alla projekt"
                                href="/vara-projekt"
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.grid}`}>
                    <ProjectCard project={project} />
                    <ProjectCard project={project2} />
                </div>
                <div className={styles.hideDesktop}>
                    <PrimaryButton
                        type="link"
                        background="brand"
                        label="Alla projekt"
                        href="/vara-projekt"
                    />
                </div>
            </div>
        </section>
    );
}
