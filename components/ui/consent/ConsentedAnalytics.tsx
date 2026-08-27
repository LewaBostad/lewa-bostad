"use client";

import Script from "next/script";
import { useConsent } from "./ConsentContext";

export default function ConsentedAnalytics() {
    const { consent } = useConsent();
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

    if (consent !== "accepted" || (!gaId && !adsId)) return null;

    const configCalls = [gaId, adsId]
        .filter(Boolean)
        .map((id) => `gtag('config', '${id}');`)
        .join("\n");

    return (
        <>
            <Script
                id="gtag-src"
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId ?? adsId}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    ${configCalls}
                `}
            </Script>
        </>
    );
}
