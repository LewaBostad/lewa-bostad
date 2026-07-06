import styles from "./Intro.module.css";
import { IntroSection } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";

const PROCESS_STEPS = [
    "Projektet inleds",
    "Pågående produktion",
    "Förhandsvisning",
    "Uthyrning börjar",
    "Inflyttning",
];

interface IntroProps {
    intro: IntroSection;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
}

export default function Intro({ intro, background = "default", id, eyebrow, hideEyebrow }: IntroProps) {
    return (
        <section id={id} className={`section section--${background}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.header}>
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2>{intro.title}</h2>
                    <p className={styles.body}>{intro.text}</p>
                </div>

                <div className={styles.timelineScroll}>
                    <div className={styles.timeline}>
                        {PROCESS_STEPS.map((label, i) => (
                            <div key={label} className={styles.step}>
                                <div className={styles.circle}>
                                    {i === intro.statusStep && <span className={styles.dot} />}
                                </div>
                                <span className={styles.stepLabel}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.objectInfo}>
                    {(intro.objectInfo ?? []).map((item) => (
                        <div key={item.title} className={styles.objectItem}>
                            <span className={styles.objectLabel}>{item.title}</span>
                            <span className={styles.objectValue}>{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.buttonRow}>
                    <RealtorLinkButton href={intro.realtorLink} label={intro.realtorLinkLabel} />
                </div>
            </div>
        </section>
    );
}
