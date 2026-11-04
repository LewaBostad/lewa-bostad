import type { NextConfig } from "next";

const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-XSS-Protection", value: "1; mode=block" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
];

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
            },
        ],
    },
    // Serve Sanity-uploaded PDFs from our own domain: /dokument/<assetId>/<readable-name>.pdf
    // (see sectionButtonProjection in lib/sanity/queries.ts). The name segment is cosmetic –
    // it only sets the browser tab title / download name; the asset ID picks the file.
    async rewrites() {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
        return [
            {
                source: "/dokument/:assetId([a-f0-9]{40})/:filename",
                destination: `https://cdn.sanity.io/files/${projectId}/${dataset}/:assetId.pdf`,
            },
        ];
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
