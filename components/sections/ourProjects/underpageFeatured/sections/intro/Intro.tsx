import styles from "./Intro.module.css";
import { IntroSection, RealtorCard as RealtorCardData } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";
import RealtorCard from "@/components/ui/realtorCard/RealtorCard";

const MAX_REALTOR_CARDS = 2;

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
    realtorCards?: RealtorCardData[] | null;
}

export default function Intro({ intro, background = "default", id, eyebrow, hideEyebrow, realtorCards }: IntroProps) {
    const validRealtorCards = (realtorCards ?? [])
        .filter((realtor) => realtor?.fullName)
        .slice(0, MAX_REALTOR_CARDS);

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

                {validRealtorCards.length > 0 ? (
                    <div
                        className={`${styles.cardRow} ${validRealtorCards.length > 1 ? styles["cardRow--multiple"] : ""}`}
                    >
                        {validRealtorCards.map((realtor, index) => (
                            <RealtorCard
                                key={realtor.fullName ?? index}
                                realtorCard={realtor}
                                equalWidth={validRealtorCards.length > 1}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.buttonRow}>
                        <RealtorLinkButton href={intro.realtorLink} label={intro.realtorLinkLabel} />
                    </div>
                )}
            </div>
        </section>
    );
}
