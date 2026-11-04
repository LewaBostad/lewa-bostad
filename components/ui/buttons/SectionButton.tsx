import { SectionButtonData } from "@/types/Project.types";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "./RealtorLinkButton";

const DEFAULT_LABELS: Record<SectionButtonData["type"], string> = {
    realtor: "Läs mer & kontakt",
    pdf: "Öppna PDF",
};

interface SectionButtonProps {
    button?: SectionButtonData | null;
    background?: Background;
}

/** Renders a featured section's optional button (realtor link or PDF); both open in a new tab. */
export default function SectionButton({ button, background }: SectionButtonProps) {
    if (!button?.href) return null;

    return (
        <RealtorLinkButton
            href={button.href}
            label={button.label || DEFAULT_LABELS[button.type]}
            background={background}
        />
    );
}
