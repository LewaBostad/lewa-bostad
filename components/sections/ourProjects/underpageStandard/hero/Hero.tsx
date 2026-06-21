import { StandardProject } from "@/types/Project.types";
import styles from "./Hero.module.css";
import Image from "next/image";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import HeaderScrollWatcher from "./HeaderScrollWatcher";

interface HeroProps {
    project: StandardProject;
}

export default function Hero({ project }: HeroProps) {
    return (
        <section className={styles.sectionWrapper} id="hero">
            <HeaderScrollWatcher />
            <div className={styles.imageWrapper} id="hero-image">
                <Image
                    src={project.images.thumbnail.src}
                    alt={project.images.thumbnail.alt}
                    className={styles.image}
                    fill
                />
                <div className={styles.buttonWrapper}>
                    <PrimaryButton
                        type="link"
                        href={`/vara-projekt/${project.slug}/galleri`}
                        label="Visa alla bilder"
                        background="ghost"
                    />
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.outer}>
                    <h1>
                        {project.title}, <span className={styles.italic}>{project.location}</span>
                    </h1>
                    {project.hideObjectInfo ? (
                        <p className={styles.placeholder}>
                            {project.objectInfoPlaceholder ?? "Mer information kommer snart"}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {project.objectInfo.map((item) => (
                                <div key={item.title} className={styles.object}>
                                    <p className="text-meta">{item.title}</p>
                                    <p className={styles.value}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
