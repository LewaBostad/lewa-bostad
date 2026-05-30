"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./MobileMenu.module.css";
import { menu } from "../menu";
import Link from "next/link";
import { IconChevronRight2Outline24, IconXmarkOutline24 } from "nucleo-core-outline-24";
import Image from "next/image";
import logo from "@/public/logo/logo_green.png";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const pathname = usePathname();

    const handleHome = () => {
        if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, setIsOpen]);

    return (
        <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
            <div className={styles.header}>
                <Link href="/" onClick={handleHome}>
                    <Image
                        src={logo}
                        alt="Logga för lewa bostad"
                        style={{ height: "var(--logo-height)", width: "auto" }}
                    />
                </Link>

                <button type="button" onClick={() => setIsOpen(false)} aria-label="Stäng menyn">
                    <IconXmarkOutline24 />
                </button>
            </div>
            <nav className={styles.nav}>
                <Link key="hem" href="/" className={styles.link} onClick={handleHome}>
                    <span>Hem</span>
                    <IconChevronRight2Outline24 size={16} />
                </Link>
                {menu.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.link}>
                        <span>{item.label}</span>
                        <IconChevronRight2Outline24 size={16} />
                    </Link>
                ))}
            </nav>
            <div className={styles.integrity}>
                <Link href="/integritetspolicy" className={styles.meta}>
                    Integritetspolicy
                </Link>
            </div>
        </div>
    );
}
