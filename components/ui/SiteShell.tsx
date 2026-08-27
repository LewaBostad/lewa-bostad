import { Suspense } from "react";
import { ConsentProvider } from "@/components/ui/consent/ConsentContext";
import ConsentedAnalytics from "@/components/ui/consent/ConsentedAnalytics";
import CookieBanner from "@/components/ui/consent/CookieBanner";
import Footer from "@/components/ui/footer/Footer";
import ConditionalFooter from "@/components/ui/footer/ConditionalFooter";

export default function SiteShell({ children }: { children: React.ReactNode }) {
    return (
        <ConsentProvider>
            {children}
            <ConsentedAnalytics />
            <CookieBanner />
            <Suspense fallback={<Footer />}>
                <ConditionalFooter />
            </Suspense>
        </ConsentProvider>
    );
}
