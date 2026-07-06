import { Background } from "@/types/Props.types";
import Link from "next/link";
import styles from "./PrimaryButton.module.css";

type PrimaryButtonProps =
    | {
          type: "link";
          href: string;
          label: string;
          onClick?: never;
          background?: Background;
          disabled?: boolean;
          newTab?: boolean;
      }
    | {
          type: "submit" | "reset" | "button";
          href?: never;
          label: string;
          onClick?: () => void;
          background?: Background;
          disabled?: boolean;
          newTab?: never;
      };

export default function PrimaryButton({
    type,
    background,
    label,
    href,
    onClick,
    disabled,
    newTab,
}: PrimaryButtonProps) {
    if (type === "link") {
        return (
            <Link
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className={`${styles.button} ${styles[background ?? "default"]}`}
            >
                <span className={styles.label}>{label}</span>
            </Link>
        );
    }

    return (
        <button
            type={type as "submit" | "reset" | "button"}
            className={`${styles.button} ${styles[background ?? "default"]}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.label}>{label}</span>
        </button>
    );
}
