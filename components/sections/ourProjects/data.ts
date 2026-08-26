import { Project } from "@/types/Project.types";

// Glansbaggen imports
import Glansbaggen_badrum_001 from "@/public/projects/glansbaggen/Glansbaggen_badrum_001.webp";
import Glansbaggen_barnrum_001 from "@/public/projects/glansbaggen/Glansbaggen_barnrum_001.webp";
import Glansbaggen_exterior_1_002 from "@/public/projects/glansbaggen/Glansbaggen_exterior_1_002.webp";
import Glansbaggen_exterior_2_002 from "@/public/projects/glansbaggen/Glansbaggen_exterior_2_002.webp";
import Glansbaggen_exterior_3_002 from "@/public/projects/glansbaggen/Glansbaggen_exterior_3_002.webp";
import Glansbaggen_kok_001 from "@/public/projects/glansbaggen/Glansbaggen_kok_001.webp";
import Glansbaggen_kok_2_001 from "@/public/projects/glansbaggen/Glansbaggen_kok_2_001.webp";
import Glansbaggen_ovre_hall_001 from "@/public/projects/glansbaggen/Glansbaggen_Ovre_hall_001.webp";
import Glansbaggen_sovrum_001 from "@/public/projects/glansbaggen/Glansbaggen_Sovrum_001.webp";
import Glansbaggen_vardagsrum_001 from "@/public/projects/glansbaggen/Glansbaggen_Vardagsrum_001.webp";

// Kummelnäshöjden imports
import Kummelnas_exterior_1_back_black_003 from "@/public/projects/kummelnashojden/Exterior_1_Back_Black_003.webp";
import Kummelnas_exterior_1_back_wood_003 from "@/public/projects/kummelnashojden/Exterior_1_Back_Wood_003.webp";
import Kummelnas_exterior_1_black_002 from "@/public/projects/kummelnashojden/Exterior_1_Black_002.webp";
import Kummelnas_exterior_1_wood_002 from "@/public/projects/kummelnashojden/Exterior_1_Wood_002.webp";
import Kummelnas_exterior_2_back_black_002 from "@/public/projects/kummelnashojden/Exterior_2_Back_Black_002.webp";
import Kummelnas_exterior_2_back_wood_002 from "@/public/projects/kummelnashojden/Exterior_2_Back_Wood_002.webp";
import Kummelnas_exterior_2_black_001 from "@/public/projects/kummelnashojden/Exterior_2_Black_001.webp";
import Kummelnas_exterior_2_wood_002 from "@/public/projects/kummelnashojden/Exterior_2_Wood_002.webp";
import Kummelnas_exterior_3_black_002 from "@/public/projects/kummelnashojden/Exterior_3_Black_002.webp";
import Kummelnas_exterior_3_wood_002 from "@/public/projects/kummelnashojden/Exterior_3_Wood_002.webp";
import Kummelnas_interior_1_002 from "@/public/projects/kummelnashojden/Interior_1_002.webp";
import Kummelnas_interior_2_002 from "@/public/projects/kummelnashojden/Interior_2_002.webp";
import Kummelnas_interior_3_002 from "@/public/projects/kummelnashojden/Interior_3_002.webp";
import Kummelnas_interior_4_002 from "@/public/projects/kummelnashojden/Interior_4_002.webp";
import Kummelnas_interior_5_003 from "@/public/projects/kummelnashojden/Interior_5_003.webp";
import Kummelnas_interior_6_002 from "@/public/projects/kummelnashojden/Interior_6_002.webp";
import Kummelnas_interior_7_002 from "@/public/projects/kummelnashojden/Interior_7_002.webp";

export const STATUS_FILTERS = [
    { value: "all", label: "Alla" },
    { value: "planned", label: "Planerade" },
    { value: "ongoing", label: "Pågående" },
    { value: "completed", label: "Genomförda" },
] as const;

export const projectData: Project[] = [
    {
        slug: "glansbaggen",
        title: "Glansbaggen",
        location: "Tumba",
        address: "Fågelbyn, Tumba",
        lat: 59.2041,
        lng: 17.8283,
        status: {
            value: "completed",
            label: "Genomförd",
        },
        sections: [
            {
                title: "Rubrik om projektet xxxxx.",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta risus dolor, ac tempus nulla efficitur
                    et. Nulla suscipit aliquet blandit. Aliquam erat volutpat. Vestibulum congue tincidunt pretium. Etiam metus nisl, laoreet
                     a volutpat quis, auctor nec tortor. Suspendisse efficitur, lorem eu porta placerat, turpis ipsum suscipit turpis, eu suscipit
                      elit sapien placerat est. Curabitur auctor nulla maximus hendrerit egestas. Curabitur orci velit, vehicula ac tortor at,
                      bibendum bibendum metus.`,
                image: { src: Glansbaggen_exterior_1_002.src, alt: "Exteriör av Glansbaggen" },
                imageOrientation: "left",
            },
            {
                title: "Området.",
                text: `Fågelbyn är en växande stadsdel med familjevänlig karaktär, bara 10 minuter från Tumba
                    Centrum. Utanför dörren finns allt som behövs för en bekväm vardag: förskola, restauranger
                    och butiker men också stora grönområden kring Lida naturreservat.`,
                image: { src: Glansbaggen_vardagsrum_001.src, alt: "Vardagsrum i Glansbaggen" },
                imageOrientation: "right",
            },
        ],
        objectInfo: [
            { title: "Byggstart", value: "2026" },
            { title: "Inflyttning", value: "2027" },
            { title: "Antal rum", value: "6 RoK" },
            { title: "Antal bostäder", value: "12 radhus" },
        ],
        images: {
            thumbnail: {
                src: Glansbaggen_vardagsrum_001.src,
                alt: "Exteriör av Glansbaggen",
            },
            gallery: [
                { src: Glansbaggen_exterior_1_002.src, alt: "Exteriör av Glansbaggen" },
                { src: Glansbaggen_exterior_2_002.src, alt: "Exteriör av Glansbaggen" },
                { src: Glansbaggen_exterior_3_002.src, alt: "Exteriör av Glansbaggen" },
                { src: Glansbaggen_vardagsrum_001.src, alt: "Vardagsrum i Glansbaggen" },
                { src: Glansbaggen_kok_001.src, alt: "Kök i Glansbaggen" },
                { src: Glansbaggen_kok_2_001.src, alt: "Kök i Glansbaggen" },
                { src: Glansbaggen_badrum_001.src, alt: "Badrum i Glansbaggen" },
                { src: Glansbaggen_barnrum_001.src, alt: "Barnrum i Glansbaggen" },
                { src: Glansbaggen_sovrum_001.src, alt: "Sovrum i Glansbaggen" },
                { src: Glansbaggen_ovre_hall_001.src, alt: "Övre hall i Glansbaggen" },
            ],
        },
    },
    {
        slug: "kummelnashojden",
        title: "Kummelnäshöjden",
        location: "Nacka",
        address: "Bågvägen, Kummelnäs",
        lat: 59.3183,
        lng: 18.2531,
        status: {
            value: "planned",
            label: "Planerad",
        },
        sections: [
            {
                title: "Ett hem att längta till.",
                text: `Välkommen till Kummelnäshöjden – ett unikt bostadsprojekt i hjärtat av Kummelnäs, Nacka.
                    Med högt och soligt läge på Bågvägen utvecklar vi 14 stilfulla parhus och 6 charmiga
                    minivillor. Perfekt för dig som vill bo nära skärgården men ändå ha staden inom räckhåll.
                    Bostäderna är moderna med tidlös arkitektur, genomtänkta planlösningar och hållbara
                    materialval. De karakteriseras av generösa ljusinsläpp, öppna sällskapsytor och smarta
                    lösningar för hela familjens behov.`,
                image: { src: Kummelnas_interior_1_002.src, alt: "Interiör av Kummelnäshöjden" },
                imageOrientation: "left",
            },
            {
                title: "Området.",
                text: `Kummelnäs är en av Nackas mest eftertraktade pärlor – omgivet av hav, naturreservat och
                    småbåtshamnar. Här bor du med skogspromenader, badvikar och lugnet som vardag,
                    samtidigt som du når Slussen på under 30 minuter.`,
                image: { src: Kummelnas_exterior_1_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                imageOrientation: "right",
            },
        ],
        objectInfo: [
            { title: "Byggstart", value: "2025" },
            { title: "Inflyttning", value: "2025" },
            { title: "Antal rum", value: "6 RoK" },
            { title: "Antal bostäder", value: "14 parhus och 6 studiohus" },
        ],
        images: {
            thumbnail: {
                src: Kummelnas_interior_2_002.src,
                alt: "Exteriör av Kummelnäshöjden",
            },
            gallery: [
                { src: Kummelnas_exterior_1_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_1_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_1_back_wood_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_1_back_black_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_2_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_2_black_001.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_2_back_wood_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_2_back_black_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_3_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_3_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_interior_1_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_2_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_3_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_4_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_5_003.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_6_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_7_002.src, alt: "Interiör av Kummelnäshöjden" },
            ],
        },
    },
    {
        slug: "kringlan",
        title: "Kringlan",
        location: "Tyresö",
        address: "Kringelkroken 2, Tyresö",
        lat: 59.2442,
        lng: 18.229,
        status: {
            value: "planned",
            label: "Planerad",
        },
        sections: [
            {
                title: "Xxxxxxxxx xxxxx.",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta risus dolor, ac tempus nulla efficitur
                    et. Nulla suscipit aliquet blandit. Aliquam erat volutpat. Vestibulum congue tincidunt pretium. Etiam metus nisl, laoreet
                    a volutpat quis, auctor nec tortor. Suspendisse efficitur, lorem eu porta placerat, turpis ipsum suscipit turpis, eu suscipit
                    elit sapien placerat est. Curabitur auctor nulla maximus hendrerit egestas. Curabitur orci velit, vehicula ac tortor at,
                    bibendum bibendum metus.`,
                image: { src: Glansbaggen_exterior_2_002.src, alt: "Exteriör av Kringlan" },
                imageOrientation: "left",
            },
            {
                title: "Området.",
                text: `Din nya adress Kringelkroken 2 har det bästa av två världar. Här bor du med naturen inpå
                    knuten och samtidigt på bekvämt avstånd till Tyresö Centrum med ett stort utbud av
                    butiker, restauranger och service. Bara några hundra meter från din dörr sträcker ett stort
                    naturreservat ut sig med motionsslingor, skidspår, badsjöar, bondgårdar och äventyrliga
                    friluftsaktiviteter för hela familjen.`,
                image: { src: Kummelnas_interior_3_002.src, alt: "Interiör av Kringlan" },
                imageOrientation: "right",
            },
        ],
        objectInfo: [
            { title: "Byggstart", value: "2026" },
            { title: "Inflyttning", value: "2027" },
            { title: "Antal rum", value: "6 RoK" },
            { title: "Antal bostäder", value: "14 parhus och 7 studiohus" },
        ],
        images: {
            thumbnail: {
                src: Glansbaggen_exterior_2_002.src,
                alt: "Exteriör av Kringlan",
            },
            gallery: [
                { src: Kummelnas_exterior_1_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_1_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_1_back_wood_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_1_back_black_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_2_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_2_black_001.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_2_back_wood_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_2_back_black_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_3_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_3_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_interior_1_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_2_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_3_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_4_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_5_003.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_6_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_7_002.src, alt: "Interiör av Kummelnäshöjden" },
            ],
        },
    },
    {
        slug: "ark44",
        underpageType: "featured",
        title: "ARK44",
        location: "Nacka",
        address: "Krokhöjden, Nacka",
        lat: 59.3065,
        lng: 18.1438,
        status: {
            value: "planned",
            label: "Planerad",
        },
        sections: [
            {
                _type: "introSection",
                eyebrow: "Inledning",
                title: "Xxxxx xxx xxxxx",
                text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta risus dolor, ac tempus nulla efficitur
                    et. Nulla suscipit aliquet blandit. Aliquam erat volutpat. Vestibulum congue tincidunt pretium. Etiam metus nisl, laoreet
                    a volutpat quis, auctor nec tortor. Suspendisse efficitur, lorem eu porta placerat, turpis ipsum suscipit turpis, eu suscipit
                    elit sapien placerat est. Curabitur auctor nulla maximus hendrerit egestas. Curabitur orci velit, vehicula ac tortor at,
                    bibendum bibendum metus.`,
                timelineSteps: [
                    { active: true, topText: "", label: "Projektet inleds" },
                    { active: false, topText: "", label: "Pågående produktion" },
                    { active: false, topText: "", label: "Förhandsvisning" },
                    { active: false, topText: "", label: "Uthyrning börjar" },
                    { active: false, topText: "", label: "Inflyttning" },
                ],
                objectInfo: [
                    { title: "Område", value: "Krokhöjden, Nacka" },
                    { title: "Antal bostäder", value: "44 radhus" },
                    { title: "Antal rum", value: "5–6 RoK" },
                    { title: "Boarea", value: "112-146 kvm" },
                    { title: "Upplåtelseform", value: "Bostadsrätt" },
                    { title: "Inflyttning", value: "XXmånad 202X" },
                ],
            },
            {
                _type: "sectionSplit",
                eyebrow: "Projektet",
                title: "Ett kvarter där barnen hittar ut och du hittar hem.",
                text: `I ARK 44 får livet lite mer svängrum - från vardagens planerade stunder
                    till spontana äventyr. Barnen springer fritt mellan husen, grannar
                    grillar på den gemensamma gården och känslan av hemma sträcker sig långt
                    bortom den egna ytterdörren. Kvarteret består av 44 välplanerade radhus om
                    två till tre plan med generöst ljusinsläpp och smarta arkitektoniska lösningar.
                    Det kuperade landskapet ger området karaktär och skapar fina utblickar över
                    omgivningen.`,
                image: { src: Kummelnas_exterior_3_wood_002.src, alt: "Exteriör av ARK44" },
                imageOrientation: "right",
            },
            {
                _type: "sectionBullets",
                eyebrow: "Bostäderna",
                title: "Radhusdrömmen slår in.",
                text: `Öppna dörren och upptäck hemmets alla kvaliteter. Ljuset strömmar in genom
                    generösa fönster, materialen är noga utvalda och den mjuka färgpaletten följer med
                    från rum till rum.`,
                bulletPoints: [
                    "Radhus i 2–3 plan",
                    "Egen carport",
                    "Terrass med trätrall mot gemensam grönyta",
                    "Balkong med glasräcke (3-planshus)",
                ],
            },
            {
                _type: "sectionSplitDouble",
                eyebrow: "Planlösningar",
                title: "Planlösningar",
                text: "Välplanerade ytor med genomtänkt arkitektur och smarta lösningar för hela familjen.",
                image1: { src: Kummelnas_exterior_3_wood_002.src, alt: "Exteriör av ARK44" },
                image2: { src: Kummelnas_interior_5_003.src, alt: "Interiör av ARK44" },
            },
            {
                _type: "sectionSubsections",
                eyebrow: "Material",
                title: "Material och detaljer",
                subSections: [
                    {
                        title: "Kök",
                        text: `Köket har inretts med fokus på både funktion och estetik. Inredningen går i gråa
                            toner med genomtänkta lösningar som förenklar vardagen.`,
                        bulletPoints: [
                            "Bänkskiva i kvartskomposit med underlimmad ho",
                            "Inbyggd fläkt",
                            "Rymliga högskåp som ansluter till tak",
                            "Helintegrerade vitvaror från Siemens",
                            "Varmluftsugn och infälld induktionshäll",
                        ],
                    },
                    {
                        title: "Badrum",
                        text: `Kökets gråa nyanser följer med in i badrummet och skapar en sammanhållen
                            materialpalett genom hemmet. Samtliga bostäder har WC med dusch samt badrum
                            med badkar.`,
                        bulletPoints: [
                            "Komfortgolvvärme i golv",
                            "Vägghängd WC",
                            "Dusch med klarglasvägg",
                            "Tvättmaskin och torktumlare under bänkskiva",
                            "Infällda spotlights i tak",
                        ],
                    },
                ],
            },
            {
                _type: "sectionText",
                eyebrow: "Arkitektur",
                title: "Arkitektur",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
                _type: "sectionMap",
                eyebrow: "Karta",
                title: "Karta",
            },
        ],
        objectInfo: [
            { title: "Byggstart", value: "2026/2027" },
            { title: "Inflyttning", value: "2027" },
            { title: "Antal rum", value: "5–6 RoK" },
            { title: "Antal bostäder", value: "44 xxxx och xxxxx" },
        ],
        images: {
            thumbnail: {
                src: Kummelnas_exterior_2_wood_002.src,
                alt: "Exteriör av ARK44",
            },
            gallery: [
                { src: Kummelnas_exterior_1_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_1_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_1_back_wood_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_1_back_black_003.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_2_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_2_black_001.src, alt: "Exteriör av Kummelnäshöjden" },
                {
                    src: Kummelnas_exterior_2_back_wood_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                {
                    src: Kummelnas_exterior_2_back_black_002.src,
                    alt: "Bakre exteriör av Kummelnäshöjden",
                },
                { src: Kummelnas_exterior_3_wood_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_exterior_3_black_002.src, alt: "Exteriör av Kummelnäshöjden" },
                { src: Kummelnas_interior_1_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_2_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_3_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_4_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_5_003.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_6_002.src, alt: "Interiör av Kummelnäshöjden" },
                { src: Kummelnas_interior_7_002.src, alt: "Interiör av Kummelnäshöjden" },
            ],
        },
    },
    // ── TEMPORARY: marker style testing ──────────────────────────────────────
    {
        slug: "tmp-ongoing-1",
        title: "Södermalm 12",
        location: "Stockholm",
        address: "Hornsgatan 12, Södermalm",
        lat: 59.3179,
        lng: 18.0622,
        status: { value: "ongoing", label: "Pågående" },
        sections: [],
        objectInfo: [],
        images: {
            thumbnail: { src: Kummelnas_exterior_1_wood_002.src, alt: "" },
            gallery: [],
        },
    },
    {
        slug: "tmp-ongoing-2",
        title: "Lidingö Park",
        location: "Lidingö",
        address: "Kyrkviken, Lidingö",
        lat: 59.3639,
        lng: 18.1481,
        status: { value: "ongoing", label: "Pågående" },
        sections: [],
        objectInfo: [],
        images: {
            thumbnail: { src: Kummelnas_exterior_1_wood_002.src, alt: "" },
            gallery: [],
        },
    },
    {
        slug: "tmp-completed-1",
        title: "Bromma Strand",
        location: "Bromma",
        address: "Ulvsundavägen, Bromma",
        lat: 59.3446,
        lng: 17.9512,
        status: { value: "completed", label: "Genomförd" },
        sections: [],
        objectInfo: [],
        images: {
            thumbnail: { src: Kummelnas_exterior_1_wood_002.src, alt: "" },
            gallery: [],
        },
    },
    // ── END TEMPORARY ─────────────────────────────────────────────────────────
];
