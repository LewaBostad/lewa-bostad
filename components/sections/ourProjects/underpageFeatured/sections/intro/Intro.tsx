import styles from "./Intro.module.css";
import { IntroSection, RealtorCard as RealtorCardData, SectionButtonData } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import SectionButton from "@/components/ui/buttons/SectionButton";
import RealtorCard from "@/components/ui/realtorCard/RealtorCard";

const MAX_REALTOR_CARDS = 2;
const MAX_REALTOR_CARD_BUTTONS = 2;

interface IntroProps {
    intro: IntroSection;
    background?: Background;
    id?: string;
    eyebrow?: string;
    hideEyebrow?: boolean;
    realtorCards?: RealtorCardData[] | null;
    realtorCardButtons?: SectionButtonData[] | null;
}

export default function Intro({ intro, background = "default", id, eyebrow, hideEyebrow, realtorCards, realtorCardButtons }: IntroProps) {
    const validRealtorCards = (realtorCards ?? [])
        .filter((realtor) => realtor?.fullName)
        .slice(0, MAX_REALTOR_CARDS);

    // Buttons under the realtor cards (PDFs), followed by the section's own button.
    // Realtor cards replace the section's realtor-link button; a section PDF button is shown regardless.
    const buttons = (realtorCardButtons ?? []).filter((button) => button?.href).slice(0, MAX_REALTOR_CARD_BUTTONS);
    if (intro.button?.href && (intro.button.type === "pdf" || validRealtorCards.length === 0)) {
        buttons.push(intro.button);
    }

    const timelineSteps = intro.timelineSteps ?? [];
    const hasTopText = timelineSteps.some((step) => step.topText);

    return (
        <section id={id} className={`section section--${background}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.header}>
                    {eyebrow && !hideEyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
                    <h2>{intro.title}</h2>
                    <p className={styles.body}>{intro.text}</p>
                </div>

                <div className={styles.timelineScroll}>
                    <div className={`${styles.timeline} ${hasTopText ? styles["timeline--withTopText"] : ""}`}>
                        {timelineSteps.map((step, i) => (
                            <div key={`${step.label}-${i}`} className={styles.step}>
                                {hasTopText && <span className={styles.stepTop}>{step.topText}</span>}
                                <div className={styles.circle}>{step.active && <span className={styles.dot} />}</div>
                                <span className={styles.stepLabel}>{step.label}</span>
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

                {validRealtorCards.length > 0 && (
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
                )}
                {buttons.length > 0 && (
                    <div className={styles.buttonRow}>
                        {buttons.map((button, index) => (
                            <SectionButton key={`${button.href}-${index}`} button={button} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
