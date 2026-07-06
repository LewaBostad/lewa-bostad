"use client";

import { usePathname } from "next/navigation";
import { ConsentProvider } from "@/components/ui/consent/ConsentContext";
import CookieBanner from "@/components/ui/consent/CookieBanner";
import Footer from "@/components/ui/footer/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideFooter = pathname === "/kontakt";

    return (
        <ConsentProvider>
            {children}
            <CookieBanner />
            {!hideFooter && <Footer />}
        </ConsentProvider>
    );
}
