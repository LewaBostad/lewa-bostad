import Image from "next/image";
import { Background } from "@/types/Props.types";
import RealtorLinkButton from "@/components/ui/buttons/RealtorLinkButton";
import styles from "./SplitSection.module.css";

interface SplitSectionProps {
    title: string;
    headingLevel?: "h1" | "h2" | "h3";
    headingSize?: "h1" | "h2" | "h3";
    text: string[];
    image?: string | null;
    imageAlt?: string;
    imagePosition: "left" | "right";
    background?: Background;
    realtorLink?: string;
    realtorLinkLabel?: string;
}

const headingSizeClass: Record<string, string> = {
    h2: styles.headingH2,
    h3: styles.headingH3,
};

export default function SplitSection({
    title,
    headingLevel = "h2",
    headingSize,
    text,
    image,
    imageAlt,
    imagePosition,
    background = "default",
    realtorLink,
    realtorLinkLabel,
}: SplitSectionProps) {
    const Heading = headingLevel;
    const sizeClass = headingSize ? headingSizeClass[headingSize] : undefined;
    return (
        <section className={`section section--${background}`}>
            <div
                className={`split ${imagePosition === "left" ? "split--image-left" : ""} ${!image ? styles.noImage : ""}`}
            >
                <div className="split__content stack prose">
                    <Heading className={sizeClass}>{title}</Heading>
                    {text.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                    <RealtorLinkButton href={realtorLink} label={realtorLinkLabel} />
                </div>
                {image && (
                    <div className={styles.imageWrapper}>
                        <Image src={image} alt={imageAlt ?? ""} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                    </div>
                )}
            </div>
        </section>
    );
}
