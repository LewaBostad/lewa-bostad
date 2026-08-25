import Image from "next/image";
import styles from "./RealtorCard.module.css";
import { RealtorCard as RealtorCardData } from "@/types/Project.types";
import { IconPhone, IconEnvelope } from "nucleo-sharp";

interface RealtorCardProps {
    realtorCard?: RealtorCardData | null;
    /** Force this card to take an equal, fixed share of its row (used when two cards sit side by side). */
    equalWidth?: boolean;
}

export default function RealtorCard({ realtorCard, equalWidth }: RealtorCardProps) {
    if (!realtorCard?.fullName) return null;

    const { photo, fullName, company, phone, email } = realtorCard;

    return (
        <div className={`${styles.card} ${equalWidth ? styles.split : ""}`}>
            {photo?.src && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={photo.src}
                        alt={photo.alt || `En bild på mäklaren, ${fullName}`}
                        fill
                        style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                </div>
            )}
            <div className={styles.info}>
                <div className={styles.top}>
                    <p className={`text-meta ${styles.eyebrow}`}>Ansvarig mäklare</p>
                    <div className={styles.nameGroup}>
                        <p className={styles.name}>{fullName}</p>
                        {company && <p className={styles.company}>{company}</p>}
                    </div>
                </div>
                {(phone || email) && (
                    <div className={styles.contact}>
                        {phone && (
                            <a href={`tel:${phone.replace(/\s+/g, "")}`} className={styles.contactLink}>
                                <IconPhone size={14} className={styles.contactIcon} />
                                <span>{phone}</span>
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className={styles.contactLink}>
                                <IconEnvelope size={14} className={styles.contactIcon} />
                                <span>{email}</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
