"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingCTA.module.css";

interface FloatingCTAProps {
    mode?: "scroll" | "instant";
    avoidMobileNav?: boolean;
}

export default function FloatingCTA({ mode = "scroll", avoidMobileNav = false }: FloatingCTAProps) {
    const [visible, setVisible] = useState(mode === "instant");

    useEffect(() => {
        const handleScroll = () => {
            const kontakt = document.getElementById("kontakt");
            if (!kontakt) return;

            const kontaktReached = kontakt.getBoundingClientRect().top <= window.innerHeight;

            if (mode === "instant") {
                setVisible(!kontaktReached);
            } else {
                const pastHalfViewport = window.scrollY >= window.innerHeight * 0.5;
                setVisible(pastHalfViewport && !kontaktReached);
            }
        };

        if (mode === "instant") {
            handleScroll();
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mode]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const kontakt = document.getElementById("kontakt");
        if (!kontakt) return;
        const headerHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
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
            className={`${styles.cta} ${visible ? styles.visible : ""} ${avoidMobileNav ? styles.avoidMobileNav : ""}`}
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
        >
            <span>Anmäl intresse</span>
        </a>
    );
}
