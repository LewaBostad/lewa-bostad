import owners from "@/public/aboutHero/owners.jpg";

import SplitSectionBleed from "../splitSectionBleed/SplitSectionBleed";

export default function AboutHero() {
    return (
        <SplitSectionBleed
            image={owners}
            imageAlt="Johan Bondebjer och Magnus Ekvall"
            imagePosition="right"
            background="default"
            fullHeight
        >
            <div>
                <h2>På väg mot något nytt.</h2>
                <h2>Precis som du.</h2>
            </div>

            <p>
                Två bostadsaktörer med lång erfarenhet har gått samman och bildat Lewa Bostad.
                Företaget drivs av Johan Bondebjer, Magnus Ekvall från tidigare Bjerbo Bostad samt
                Fredrik Lidjan från Reliwe. Med en stark projektportfölj och god finansiell
                ställning fortsätter vi att skapa hållbara hem och värde för både kunder och
                samhälle.
            </p>
        </SplitSectionBleed>
    );
}
