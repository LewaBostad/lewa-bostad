import styles from "./SectionText.module.css";
import { SectionText as SectionTextType } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import SectionButton from "@/components/ui/buttons/SectionButton";

interface SectionTextProps {
    data: SectionTextType;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function SectionText({ data, background = "default", id, eyebrow, hideEyebrow }: SectionTextProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className={`container ${styles.inner}`}>
                {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                <h2>{data.title}</h2>
                <p className="prose">{data.text}</p>
                <SectionButton button={data.button} />
            </div>
        </section>
    );
}
