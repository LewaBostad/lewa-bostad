import React from "react";
import { IconMenu2 } from "nucleo-sharp";
import styles from "./MobileMenu.module.css";
import { IconMenuRightOutline24 } from "nucleo-core-outline-24";

interface HamburgerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Hamburger({ isOpen, setIsOpen }: HamburgerProps) {
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="flex flex-col gap-1"
                aria-expanded={isOpen}
                aria-controls="mobil-meny"
            >
                <IconMenuRightOutline24 className={styles.hamburger} size={22} />
            </button>
        </>
    );
}
