import { Project } from "@/types/Project.types";
import styles from "./Hero.module.css";
import Image from "next/image";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

interface HeroProps {
    project: Project;
}

export default function Hero({ project }: HeroProps) {
    return (
        <section className={styles.sectionWrapper} id="hero">
            <div className={styles.imageWrapper}>
                <Image
                    src={project.images.thumbnail.src}
                    alt={project.images.thumbnail.alt}
                    className={styles.image}
                    fill
                />
                <div className={styles.buttonWrapper}>
                    <PrimaryButton type="button" label="Visa alla bilder" background="ghost" />
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.outer}>
                    <h1>{project.title}</h1>
                    <div className={styles.grid}>
                        {project.objectInfo.map((item) => (
                            <div key={item.title} className={styles.object}>
                                <p className="text-meta">{item.title}</p>
                                <p className={styles.value}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
