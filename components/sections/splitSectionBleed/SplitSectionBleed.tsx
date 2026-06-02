import Image, { StaticImageData } from "next/image";
import { Background } from "@/types/Props.types";
import styles from "./SplitSectionBleed.module.css";

interface SplitSectionBleedProps {
    image: StaticImageData;
    imageAlt: string;
    imagePosition: "left" | "right";
    background?: Background;
    fullHeight?: boolean;
    children: React.ReactNode;
}

export default function SplitSectionBleed({
    image,
    imageAlt,
    imagePosition,
    background = "default",
    fullHeight,
    children,
}: SplitSectionBleedProps) {
    return (
        <section
            className={`section--${background} section--bleed ${fullHeight ? "section--full-height" : ""}`}
        >
            <div
                className={`split split--no-gap ${fullHeight ? "split--full-height" : ""} ${imagePosition === "left" ? "split--image-left" : ""}`}
            >
                <div className="section split__content stack">{children}</div>
                <div
                    className={`${styles.imageWrapper} ${fullHeight ? styles.imageWrapperFullHeight : ""}`}
                >
                    <Image src={image} alt={imageAlt} fill style={{ objectFit: "cover" }} />
                </div>
            </div>
        </section>
    );
}
