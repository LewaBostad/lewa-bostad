"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import logo from "@/public/logo/lewa_bostad_logo_vit_recolored.svg";
import { menu } from "../menu";
import Link from "next/link";
import Hamburger from "../mobile/Hamburger";
import MobileMenu from "../mobile/MobileMenu";
import styles from "./HeroHeader.module.css";

const SHRINK_END = 1.35;
const MAX_SCALE = 1.6;

export default function HeroHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isStuck, setIsStuck] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        let headerHeight = header.getBoundingClientRect().height;
        let viewportHeight = window.innerHeight;
        let ticking = false;

        const update = () => {
            const threshold = viewportHeight - headerHeight;
            const scrolled = threshold > 0 ? window.scrollY / threshold : 1;

            setIsStuck(window.scrollY >= threshold);

            const t = Math.min(scrolled / SHRINK_END, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const scale = MAX_SCALE + (1 - MAX_SCALE) * eased;
            header.style.setProperty("--logo-scale", String(scale));

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        const onResize = () => {
            headerHeight = header.getBoundingClientRect().height;
            viewportHeight = window.innerHeight;
            update();
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <header ref={headerRef} className={styles.header} data-surface="brand" data-stuck={isStuck}>
            <Link href="/" className={styles.logo}>
                <Image
                    src={logo}
                    alt="Logga för lewa bostad"
                    style={{ height: "var(--logo-height)", width: "auto" }}
                />
            </Link>
            <nav className={styles.nav}>
                {menu.map((item) => (
                    <Link key={item.href} href={item.href}>
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className={styles.hamburger}>
                <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
                onClick={() => setIsOpen(false)}
            />

            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
}
