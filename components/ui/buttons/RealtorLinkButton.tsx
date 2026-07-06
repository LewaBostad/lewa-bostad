import { Background } from "@/types/Props.types";
import PrimaryButton from "./PrimaryButton";
import styles from "./RealtorLinkButton.module.css";

interface RealtorLinkButtonProps {
    href?: string;
    label?: string;
    background?: Background;
}

export default function RealtorLinkButton({ href, label, background = "brand" }: RealtorLinkButtonProps) {
    if (!href) return null;

    return (
        <div className={styles.wrapper}>
            <PrimaryButton
                type="link"
                href={href}
                label={label || "Läs mer & kontakt"}
                background={background}
                newTab
            />
        </div>
    );
}
