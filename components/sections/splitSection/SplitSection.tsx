import Image from "next/image";
import { StaticImageData } from "next/image";
import { Background } from "@/types/Props.types";
import styles from "./SplitSection.module.css";

interface SplitSectionProps {
    title: string;
    headingLevel?: "h1" | "h2" | "h3";
    text: string[];
    image: StaticImageData;
    imageAlt: string;
    imagePosition: "left" | "right";
    background?: Background;
}

export default function SplitSection({
    title,
    headingLevel = "h2",
    text,
    image,
    imageAlt,
    imagePosition,
    background = "default",
}: SplitSectionProps) {
    const Heading = headingLevel;
    return (
        <section className={`section section--${background}`}>
            <div className={`split ${imagePosition === "left" ? "split--image-left" : ""}`}>
                <div className="split__content stack prose">
                    <Heading>{title}</Heading>
                    {text.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <div className={styles.imageWrapper}>
                    <Image src={image} alt={imageAlt} fill style={{ objectFit: "cover" }} />
                </div>
            </div>
        </section>
    );
}
