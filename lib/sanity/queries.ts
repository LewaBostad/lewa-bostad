import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import type { PortableTextBlock } from "@portabletext/types";
import type {
    Project,
    StandardProject,
    FeaturedProject,
    ProjectObjectInfo,
} from "@/types/Project.types";

// ── Shared image projections ──────────────────────────────────────────────────
// Appending Sanity CDN params caps the source file Next.js has to download and process.
const imageProjection = `{ "src": asset->url, "alt": coalesce(alt, ""), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const thumbProjection = imageProjection;

// ── Status label map ──────────────────────────────────────────────────────────
const statusLabel = `select(
    status == "planned" => "Planerat",
    status == "ongoing" => "Pågående",
    status == "completed" => "Genomfört",
    ""
)`;

// ── Project list (for cards, map, interest form) ──────────────────────────────
const PROJECT_LIST_QUERY = `*[_type == "project"] | order(_createdAt asc) {
    title,
    "slug": slug.current,
    location,
    address,
    "lat": coordinates.lat,
    "lng": coordinates.lng,
    "status": { "value": status, "label": ${statusLabel} },
    objectInfo[] { title, value },
    "images": {
        "thumbnail": thumbnail ${thumbProjection},
        "gallery": gallery[] ${imageProjection}
    },
    underpageType
}`;

// ── Project slugs (for generateStaticParams) ──────────────────────────────────
const PROJECT_SLUGS_QUERY = `*[_type == "project"].slug.current`;

// ── Standard project detail ───────────────────────────────────────────────────
const STANDARD_PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    location,
    address,
    "lat": coordinates.lat,
    "lng": coordinates.lng,
    "status": { "value": status, "label": ${statusLabel} },
    objectInfo[] { title, value },
    "images": {
        "thumbnail": thumbnail ${thumbProjection},
        "gallery": gallery[] ${imageProjection}
    },
    underpageType,
    "sections": standardSections[] {
        title,
        text,
        "image": image ${imageProjection},
        "imageOrientation": imageOrientation
    }
}`;

// ── Featured project detail ───────────────────────────────────────────────────
const FEATURED_PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    location,
    address,
    "lat": coordinates.lat,
    "lng": coordinates.lng,
    "status": { "value": status, "label": ${statusLabel} },
    objectInfo[] { title, value },
    "images": {
        "thumbnail": thumbnail ${thumbProjection},
        "gallery": gallery[] ${imageProjection}
    },
    underpageType,
    "sections": featuredSections[] {
        _type,
        eyebrow,
        hideEyebrow,
        title,
        text,
        statusStep,
        objectInfo[] { title, value },
        "image": image ${imageProjection},
        imageOrientation,
        "image1": image1 ${imageProjection},
        "image2": image2 ${imageProjection},
        bulletPoints,
        subSections[] { title, text, bulletPoints }
    }
}`;

// ── Home page ─────────────────────────────────────────────────────────────────
const HOME_PAGE_QUERY = `*[_type == "homePage"][0] {
    introTitle,
    introText,
    "introImage": introImage ${imageProjection},
    projectsCtaTitle,
    projectsCtaText,
    "projectsCtaProjects": projectsCtaProjects[]-> {
        title,
        "slug": slug.current,
        location,
        "status": { "value": status, "label": ${statusLabel} },
        objectInfo[] { title, value },
        "images": {
            "thumbnail": thumbnail ${thumbProjection},
            "gallery": []
        },
        underpageType,
        "sections": []
    },
    keyFiguresTitle,
    keyFiguresText,
    keyFigures[] { value, suffix, label },
    aboutTitleLine1,
    aboutTitleLine2,
    aboutText,
    aboutBlocks[] { title, text },
    quote,
    quoteAuthor,
    "quoteImage": quoteImage ${imageProjection}
}`;

// ── About page ────────────────────────────────────────────────────────────────
const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0] {
    heroHeadingLine1,
    heroHeadingLine2,
    heroText,
    "heroImage": heroImage ${imageProjection},
    valuesHeading,
    values[] { title, text },
    sections[] {
        title,
        text,
        "image": image ${imageProjection},
        imagePosition
    }
}`;

// ── Contact page ──────────────────────────────────────────────────────────────
const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
    heading,
    intro,
    email,
    owners[] { fullName, email, "image": photo { "src": asset->url, "alt": coalesce(alt, "") } },
    acquisitionTitle,
    acquisitionText
}`;

// ── Buying guide page ─────────────────────────────────────────────────────────
const BUYING_GUIDE_QUERY = `*[_type == "buyingGuidePage"][0] {
    heroHeading,
    heroText,
    "heroImage": heroImage ${imageProjection},
    steps[] { title, text }
}`;

// ── Privacy policy page ───────────────────────────────────────────────────────
const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicyPage"][0] {
    title,
    sections[] { title, content }
}`;

// ── TypeScript return types ───────────────────────────────────────────────────

export type HomePageData = {
    introTitle: string;
    introText: PortableTextBlock[];
    introImage: { src: string; alt: string };
    projectsCtaTitle: string;
    projectsCtaText: string;
    projectsCtaProjects: Project[];
    keyFiguresTitle: string;
    keyFiguresText: string;
    keyFigures: { value: string; suffix: string; label: string }[];
    aboutTitleLine1: string;
    aboutTitleLine2: string;
    aboutText: string;
    aboutBlocks: { title: string; text: string }[];
    quote: string;
    quoteAuthor: string;
    quoteImage: { src: string; alt: string };
};

export type AboutPageData = {
    heroHeadingLine1: string;
    heroHeadingLine2: string;
    heroText: string;
    heroImage: { src: string; alt: string };
    valuesHeading: string;
    values: { title: string; text: string }[];
    sections: {
        title: string;
        text: string;
        image: { src: string; alt: string };
        imagePosition: "left" | "right";
    }[];
};

export type ContactPageData = {
    heading: string;
    intro: string;
    email: string;
    owners: { fullName: string; email: string; image: { src: string; alt: string } }[];
    acquisitionTitle: string;
    acquisitionText: PortableTextBlock[];
};

export type BuyingGuideData = {
    heroHeading: string;
    heroText: string;
    heroImage: { src: string; alt: string };
    steps: { title: string; text: string }[];
};

export type PrivacyPolicyData = {
    title: string;
    sections: { title: string; content: PortableTextBlock[] }[];
};

// ── Fetch functions ───────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
    "use cache";
    cacheLife("max");
    cacheTag("projects");
    return client.fetch(PROJECT_LIST_QUERY);
}

export async function getAllProjectSlugs(): Promise<string[]> {
    "use cache";
    cacheLife("max");
    cacheTag("projects");
    return client.fetch(PROJECT_SLUGS_QUERY);
}

export async function getProjectsForSitemap(): Promise<{ slug: string; updatedAt: string }[]> {
    "use cache";
    cacheLife("max");
    cacheTag("projects");
    return client.fetch(`*[_type == "project"] { "slug": slug.current, "updatedAt": _updatedAt }`);
}

export async function getProject(slug: string): Promise<Project | null> {
    "use cache";
    cacheLife("max");
    cacheTag("projects", `project-${slug}`);

    const base = await client.fetch<{ underpageType?: string } | null>(
        `*[_type == "project" && slug.current == $slug][0] { underpageType }`,
        { slug },
    );
    if (!base) return null;

    if (base.underpageType === "featured") {
        return client.fetch<FeaturedProject>(FEATURED_PROJECT_QUERY, { slug });
    }
    return client.fetch<StandardProject>(STANDARD_PROJECT_QUERY, { slug });
}

export async function getHomePage(): Promise<HomePageData> {
    "use cache";
    cacheLife("max");
    cacheTag("home-page");
    return client.fetch(HOME_PAGE_QUERY);
}

export async function getAboutPage(): Promise<AboutPageData> {
    "use cache";
    cacheLife("max");
    cacheTag("about-page");
    return client.fetch(ABOUT_PAGE_QUERY);
}

export async function getContactPage(): Promise<ContactPageData> {
    "use cache";
    cacheLife("max");
    cacheTag("contact-page");
    return client.fetch(CONTACT_PAGE_QUERY);
}

export async function getBuyingGuide(): Promise<BuyingGuideData> {
    "use cache";
    cacheLife("max");
    cacheTag("buying-guide-page");
    return client.fetch(BUYING_GUIDE_QUERY);
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicyData> {
    "use cache";
    cacheLife("max");
    cacheTag("privacy-policy-page");
    return client.fetch(PRIVACY_POLICY_QUERY);
}

// ── Helper: extract plain text strings from PortableText blocks ───────────────
export function blocksToStrings(blocks: PortableTextBlock[]): string[] {
    return blocks
        .map((block) => {
            if (block._type !== "block") return "";
            const children = block.children as Array<{ text?: string }> | undefined;
            return children?.map((c) => c.text ?? "").join("") ?? "";
        })
        .filter(Boolean);
}

// ── Fake project shape for list items from references (home page CTA) ────────
export function toProjectListItem(data: {
    title: string;
    slug: string;
    location: string;
    status: { value: "planned" | "ongoing" | "completed"; label: string };
    objectInfo: ProjectObjectInfo[];
    images: { thumbnail: { src: string; alt: string }; gallery: [] };
    underpageType?: string;
}): StandardProject {
    return {
        ...data,
        underpageType: "standard",
        sections: [],
    };
}
