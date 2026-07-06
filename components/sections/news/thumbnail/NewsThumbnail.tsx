import Link from "next/link";
import Image from "next/image";
import styles from "./NewsThumbnail.module.css";
import { NewsArticlePreview } from "@/types/News.types";

function formatDate(dateStr: string): string {
    const months = [
        "januari", "februari", "mars", "april", "maj", "juni",
        "juli", "augusti", "september", "oktober", "november", "december",
    ];
    const [year, month, day] = dateStr.split("-").map(Number);
    return `${day} ${months[month - 1]} ${year}`;
}

interface NewsThumbnailProps {
    article: NewsArticlePreview;
    referrer?: string;
}

export default function NewsThumbnail({ article, referrer }: NewsThumbnailProps) {
    const href = referrer
        ? `/nyheter/${article.slug}?ref=${referrer}`
        : `/nyheter/${article.slug}`;
    return (
        <Link href={href} className={styles.card}>
            {article.image && (
                <div className={`${styles.imageWrap} image-zoom`}>
                    <Image
                        src={article.image.src}
                        alt={article.image.alt || article.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            )}
            <div className={styles.content}>
                <span className="text-meta">{formatDate(article.publishedAt)}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
            </div>
        </Link>
    );
}
