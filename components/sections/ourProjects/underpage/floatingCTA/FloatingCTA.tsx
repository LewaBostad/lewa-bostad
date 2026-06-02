"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingCTA.module.css";

export default function FloatingCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const kontakt = document.getElementById("kontakt");
            if (!kontakt) return;

            const pastHalfViewport = window.scrollY >= window.innerHeight * 0.5;
            const kontaktReached = kontakt.getBoundingClientRect().top <= window.innerHeight;

            setVisible(pastHalfViewport && !kontaktReached);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const kontakt = document.getElementById("kontakt");
        if (!kontakt) return;
        const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue("--header-height")
        );
        window.scrollTo({
            top: kontakt.getBoundingClientRect().top + window.scrollY - headerHeight,
            behavior: "smooth",
        });
    };

    return (
        <a
            href="#kontakt"
            onClick={handleClick}
            className={`${styles.cta} ${visible ? styles.visible : ""}`}
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
        >
            Anmäl intresse
        </a>
    );
}
