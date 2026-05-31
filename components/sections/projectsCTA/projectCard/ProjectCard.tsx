import { Project } from "@/types/Project.types";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { image, imageAlt, title, location, status } = project;

    return (
        <div>
            <div className={styles.imageWrapper}>
                <Image src={image} alt={imageAlt} fill />
            </div>
            <div className={styles.textWrapper}>
                <div>
                    <p>{title}</p>
                    <p className="text-meta">{location}</p>
                </div>
                <p className="text-meta">{status}</p>
            </div>
        </div>
    );
}
