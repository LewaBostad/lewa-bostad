import { IconCheck } from "nucleo-sharp";
import styles from "./Gdpr.module.css";

interface GdprProps {
    accepted: boolean;
    onAcceptedChange: (accepted: boolean) => void;
}

export default function Gdpr({ accepted, onAcceptedChange }: GdprProps) {
    return (
        <div
            className={styles.wrapper}
            onClick={() => onAcceptedChange(!accepted)}
        >
            <input
                type="checkbox"
                name="gdpr"
                checked={accepted}
                readOnly
            />
            <div
                className={`${styles.checkbox} ${accepted ? styles.checked : ""}`}
            >
                {accepted && <IconCheck size={12} />}
            </div>
            <p className={`${styles.hideMobile} ${styles.label}`}>
                Jag godkänner att mina uppgifter behandlas enligt{" "}
                <a
                    href="/integritetspolicy"
                    className={styles.policyLink}
                    onClick={(e) => e.stopPropagation()}
                >
                    integritetspolicyn
                </a>
            </p>
            <p className={`${styles.hideDesktop} ${styles.label}`}>
                Jag godkänner{" "}
                <a
                    href="/integritetspolicy"
                    className={styles.policyLink}
                    onClick={(e) => e.stopPropagation()}
                >
                    integritetspolicyn
                </a>
            </p>
        </div>
    );
}
