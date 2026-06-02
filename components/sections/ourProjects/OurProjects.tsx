import { projectData } from "./data";
import styles from "./OurProjects.module.css";
import ProjectCard from "@/components/ui/projectCard/ProjectCard";

export default function OurProjects() {
    return (
        <section className="section section--default section--page-start stack">
            <div className="stack">
                <h1>Hitta hem hos oss.</h1>
                <p className="prose">
                    Lewa Bostad bygger radhus och parhus i bostadsrättsform. Husen utformas med
                    fokus på hållbar arkitektur, genomtänkt design och hög kvalitet i varje detalj.
                </p>
            </div>
            <div className={`${styles.grid}`}>
                {projectData.map((project) => (
                    <ProjectCard key={project.title} project={project} link={true} />
                ))}
            </div>
        </section>
    );
}
