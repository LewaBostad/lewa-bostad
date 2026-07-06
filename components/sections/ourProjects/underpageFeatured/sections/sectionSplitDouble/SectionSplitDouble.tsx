import Image from "next/image";
import styles from "./SectionSplitDouble.module.css";
import { SectionSplitDouble as SectionSplitDoubleType } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";

interface SectionSplitDoubleProps {
    data: SectionSplitDoubleType;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function SectionSplitDouble({ data, background = "default", id, eyebrow, hideEyebrow }: SectionSplitDoubleProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className="container stack">
                <div className={`${styles.text} stack`}>
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2>{data.title}</h2>
                    <p className="prose">{data.text}</p>
                    <RealtorLinkButton href={data.realtorLink} label={data.realtorLinkLabel} />
                </div>
                {(data.image1?.src || data.image2?.src) && (
                    <div className={styles.images}>
                        {data.image1?.src && (
                            <div className={`${styles.imageWrapper} ${!data.image2?.src ? styles.imageWrapperFull : ""}`}>
                                <Image src={data.image1.src} alt={data.image1.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                            </div>
                        )}
                        {data.image2?.src && (
                            <div className={`${styles.imageWrapper} ${!data.image1?.src ? styles.imageWrapperFull : ""}`}>
                                <Image src={data.image2.src} alt={data.image2.alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
