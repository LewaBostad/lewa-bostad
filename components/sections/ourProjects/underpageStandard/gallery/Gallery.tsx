"use client";

import styles from "./Gallery.module.css";
import { Project } from "@/types/Project.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IconChevronLeft } from "nucleo-sharp";

interface GalleryProps {
    project: Project;
}

export default function Gallery({ project }: GalleryProps) {
    const router = useRouter();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <section className={`${styles.gallery} section--default`}>
            <div className={`${styles.header} section--default`}>
                <div className={`${styles.textWrapper} container--wide`}>
                    <button
                        type="button"
                        className={`${styles.text} ${styles.backBtn}`}
                        onClick={() => router.back()}
                    >
                        <IconChevronLeft size={14} />
                        <span>Tillbaka</span>
                    </button>
                    <h1 className={styles.text}>{project.title}</h1>
                </div>
            </div>
            <div className={`${styles.galleryContainer} container--wide`}>
                {(project.images.gallery ?? []).map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" style={{ objectFit: "cover" }} />
                    </div>
                ))}
            </div>
        </section>
    );
}
