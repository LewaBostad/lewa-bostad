import type { MetadataRoute } from "next";
import { getProjectsForSitemap } from "@/lib/sanity/queries";

const BASE = "https://lewabostad.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await getProjectsForSitemap();

    const projectUrls = projects.map(({ slug, updatedAt }) => ({
        url: `${BASE}/vara-projekt/${slug}`,
        lastModified: new Date(updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        { url: BASE, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/vara-projekt`, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE}/om-oss`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE}/kontakt`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE}/att-kopa-bostad`, changeFrequency: "monthly", priority: 0.6 },
        ...projectUrls,
    ];
}
