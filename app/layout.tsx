import type { Metadata } from "next";
import "./styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-heading",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-body",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lewabostad.se"),
    title: { default: "Lewa Bostad", template: "%s – Lewa Bostad" },
    description:
        "Lewa Bostad bygger arkitektritade radhus och parhus i bostadsrättsform i Stockholms förorter – trivsamma kvarter där livet får ta plats.",
    openGraph: {
        siteName: "Lewa Bostad",
        locale: "sv_SE",
        type: "website",
        images: [{ url: "/hero/hero.webp", alt: "Lewa Bostad" }],
    },
    twitter: {
        card: "summary_large_image",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="sv"
            className={`${dmSans.variable} ${cormorant.variable}`}
        >
            <body>{children}</body>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </html>
    );
}
