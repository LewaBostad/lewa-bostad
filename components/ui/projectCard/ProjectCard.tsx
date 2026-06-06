import { Project } from "@/types/Project.types";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
    link?: boolean;
}

export default function ProjectCard({ project, link = false }: ProjectCardProps) {
    const { images, title, location, status, slug } = project;
    const { src, alt } = images.thumbnail;

    const content = (
        <>
            <div className={styles.imageWrapper}>
                <Image src={src} alt={alt} fill />
            </div>
            <div className={styles.textWrapper}>
                <div>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.meta}>{location}</p>
                </div>
                <p className={styles.meta}>{project.status.label}</p>
            </div>
        </>
    );

    if (link) {
        return (
            <Link href={`/vara-projekt/${slug}`} className={`${styles.card} ${styles.linked}`}>
                {content}
            </Link>
        );
    }

    return <div className={styles.card}>{content}</div>;
}
