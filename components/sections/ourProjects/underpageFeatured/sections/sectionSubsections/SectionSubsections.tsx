import styles from "./SectionSubsections.module.css";
import Bulletpoint from "@/components/ui/bulletpoint/Bulletpoint";
import { SectionSubsections as SectionSubsectionsType } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";

interface SectionSubsectionsProps {
    data: SectionSubsectionsType;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function SectionSubsections({ data, background = "default", id, eyebrow, hideEyebrow }: SectionSubsectionsProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className="container">
                <div className="stack">
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2 className={styles.title}>{data.title}</h2>
                    {data.subSections.map((sub, i) => (
                        <div key={i} className={`${styles.subSection} stack`}>
                            <h4>{sub.title}</h4>
                            <div className="prose stack">
                                <p>{sub.text}</p>
                                {sub.bulletPoints && (
                                    <div>
                                        {sub.bulletPoints.map((point, j) => (
                                            <Bulletpoint key={j} text={point} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className={styles.buttonRow}>
                        <RealtorLinkButton href={data.realtorLink} label={data.realtorLinkLabel} />
                    </div>
                </div>
            </div>
        </section>
    );
}
