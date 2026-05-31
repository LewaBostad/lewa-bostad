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
      }
    | {
          type: "submit" | "reset" | "button";
          href?: never;
          label: string;
          onClick?: () => void;
          background?: Background;
      };

export default function PrimaryButton({
    type,
    background,
    label,
    href,
    onClick,
}: PrimaryButtonProps) {
    if (type === "link") {
        return (
            <Link href={href} className={`${styles.button} ${styles[background ?? "default"]}`}>
                {label}
            </Link>
        );
    }

    return (
        <button
            type={type as "submit" | "reset" | "button"}
            className={`${styles.button} ${styles[background ?? "default"]}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
