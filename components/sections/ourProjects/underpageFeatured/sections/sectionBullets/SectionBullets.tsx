import styles from "./SectionBullets.module.css";
import Bulletpoint from "@/components/ui/bulletpoint/Bulletpoint";
import { SectionBullets as SectionBulletsType } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";

interface SectionBulletsProps {
    data: SectionBulletsType;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function SectionBullets({ data, background = "default", id, eyebrow, hideEyebrow }: SectionBulletsProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className="container">
                <div className={`${styles.inner} stack`}>
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2>{data.title}</h2>
                    <div className="prose stack">
                        <p>{data.text}</p>
                        <div>
                            {data.bulletPoints.map((point, i) => (
                                <Bulletpoint key={i} text={point} />
                            ))}
                        </div>
                    </div>
                    <RealtorLinkButton href={data.realtorLink} label={data.realtorLinkLabel} />
                </div>
            </div>
        </section>
    );
}
