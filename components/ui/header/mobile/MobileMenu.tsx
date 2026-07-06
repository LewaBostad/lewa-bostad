"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import styles from "./MobileMenu.module.css";
import { menu } from "../menu";
import Link from "next/link";
import { IconChevronRight2Outline24, IconXmarkOutline24 } from "nucleo-core-outline-24";
import Image from "next/image";
import logo from "@/public/logo/lewa_bostad_logo_grön_recolored.svg";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const pathname = usePathname();

    const handleLinkClick = (href: string) => {
        if (pathname === href) {
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
                <Link href="/" onClick={() => handleLinkClick("/")}>
                    <Image
                        src={logo}
                        alt="Logga för lewa bostad"
                        style={{ height: "var(--logo-height)", width: "auto" }}
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Stäng menyn"
                    className={styles.close}
                >
                    <span className={styles.closebar}></span>
                    <span className={styles.closebar}></span>
                </button>
            </div>
            <nav className={styles.nav}>
                <Link key="hem" href="/" className={styles.link} onClick={() => handleLinkClick("/")}>
                    <span>Hem</span>
                    <span className={styles.chevron}><IconChevronRight2Outline24 size={12} /></span>
                </Link>
                {menu.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={styles.link}
                        onClick={() => handleLinkClick(item.href)}
                    >
                        <span>{item.label}</span>
                        <span className={styles.chevron}><IconChevronRight2Outline24 size={12} /></span>
                    </Link>
                ))}
            </nav>
            <div className={styles.integrity}>
                <Link href="/integritetspolicy" className="text-meta">
                    Integritetspolicy
                </Link>
            </div>
        </div>
    );
}
