import Image from "next/image";
import styles from "./RealtorCard.module.css";
import { RealtorCard as RealtorCardData } from "@/types/Project.types";
import { IconPhone, IconEnvelope } from "nucleo-sharp";

interface RealtorCardProps {
    realtorCard?: RealtorCardData | null;
}

export default function RealtorCard({ realtorCard }: RealtorCardProps) {
    if (!realtorCard?.showRealtorCard || !realtorCard.fullName) return null;

    const { photo, fullName, company, phone, email } = realtorCard;

    return (
        <div className={styles.card}>
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
                <div className={styles.nameGroup}>
                    <p className={styles.name}>{fullName}</p>
                    {company && <p className={styles.company}>{company}</p>}
                </div>
                {(phone || email) && (
                    <div className={styles.contact}>
                        {phone && (
                            <a href={`tel:${phone.replace(/\s+/g, "")}`} className={styles.contactLink}>
                                <IconPhone size={16} className={styles.contactIcon} />
                                <span>{phone}</span>
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className={styles.contactLink}>
                                <IconEnvelope size={16} className={styles.contactIcon} />
                                <span>{email}</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
