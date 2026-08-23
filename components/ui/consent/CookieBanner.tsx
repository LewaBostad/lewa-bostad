"use client";

import PrimaryButton from "../buttons/PrimaryButton";
import { useConsent } from "./ConsentContext";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
    const { consent, accept, decline } = useConsent();

    if (consent !== "pending") return null;

    return (
        <div className={`${styles.wrapper} stack`}>
            <h2 className={styles.title}>
                Din integritet är viktig för oss
            </h2>
            <p className="text-small">
                Vi använder cookies för att förstå hur besökare använder
                vår webbplats — det hjälper oss att göra den bättre. Vi
                delar aldrig dina uppgifter med tredje part i
                marknadsföringssyfte. Läs mer i vår{" "}
                <a href="/integritetspolicy" className={styles.policyLink}>
                    integritetspolicy
                </a>
                .
            </p>
            <div className={styles.buttons}>
                <PrimaryButton
                    type="button"
                    label="Acceptera"
                    background="brand"
                    onClick={accept}
                />
                <PrimaryButton
                    type="button"
                    label="Avvisa"
                    background="brand"
                    onClick={decline}
                />
            </div>
        </div>
    );
}
