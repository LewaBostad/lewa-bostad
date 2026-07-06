import Image from "next/image";
import styles from "./SectionSplit.module.css";
import { SectionSplit as SectionSplitType } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";

interface SectionSplitProps {
    data: SectionSplitType;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function SectionSplit({ data, background = "default", id, eyebrow, hideEyebrow }: SectionSplitProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className="container stack">
                <div className={`${styles.text} stack`}>
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2>{data.title}</h2>
                    <p className="prose">{data.text}</p>
                    <RealtorLinkButton href={data.realtorLink} label={data.realtorLinkLabel} />
                </div>
                {data.image?.src && (
                    <Image
                        src={data.image.src}
                        alt={data.image.alt}
                        width={data.image.width ?? 1600}
                        height={data.image.height ?? 900}
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                )}
            </div>
        </section>
    );
}
