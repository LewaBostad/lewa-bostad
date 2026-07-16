import styles from "./Footer.module.css";
import PrimaryButton from "../buttons/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo/lewa_bostad_logo_vit_recolored.svg";

const YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer
            className={`section section--brand section--no-padding-bottom`}
        >
            <div className={styles.outer}>
                <div className="stack">
                    <h2>Din bostadsresa börjar här.</h2>
                    <p>
                        Varmt välkommen att kontakta oss, så hjälper vi dig
                        vidare.
                    </p>
                    <div className={styles.button}>
                        <PrimaryButton
                            type="link"
                            href="/kontakt"
                            background="default"
                            label="Kontakta oss"
                        />
                    </div>
                </div>
                <div className={styles.right}>
                    <Image src={logo} alt="Lewa Bostad" height={80} />
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.link}>© {YEAR} Lewa Bostad</p>
                <Link href="/integritetspolicy" className={styles.link}>
                    Integritetspolicy
                </Link>
            </div>
        </footer>
    );
}
