import { Background } from "@/types/Props.types";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import styles from "./InterestForm.module.css";

interface InterestFormProps {
    projectTitle: string;
    background: Extract<Background, "default" | "alt">;
}

export default function InterestForm({ projectTitle, background }: InterestFormProps) {
    return (
        <section className={`section section--${background}`} id="kontakt">
            <div className="split split--text">
                <div className="stack">
                    <div className="stack">
                        <h2>Intresseanmälan</h2>
                        <p className="prose">
                            Fyll i formuläret så hör vi av oss med mer information om{" "}
                            {projectTitle}.
                        </p>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className="text-meta" htmlFor="firstName">
                                Förnamn
                            </label>
                            <input
                                className={styles.input}
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Anna"
                                autoComplete="given-name"
                                required
                            />
                        </div>
                        <div className={styles.field}>
                            <label className="text-meta" htmlFor="lastName">
                                Efternamn
                            </label>
                            <input
                                className={styles.input}
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Lindgren"
                                autoComplete="family-name"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className="text-meta" htmlFor="email">
                            E-postadress
                        </label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="anna@exempel.se"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label className="text-meta" htmlFor="phone">
                            Telefon
                        </label>
                        <input
                            className={styles.input}
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="070 000 00 00"
                            autoComplete="tel"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className="text-meta" htmlFor="message">
                            Meddelande
                        </label>
                        <textarea
                            className={styles.textarea}
                            id="message"
                            name="message"
                            placeholder="Skriv gärna vad du är intresserad av..."
                        />
                    </div>

                    <div className={styles.footer}>
                        <p className={`text-meta ${styles.privacy}`}>
                            Vi behandlar dina uppgifter enligt GDPR och delar dem inte med
                            tredje part.
                        </p>
                        <PrimaryButton type="submit" background="brand" label="Skicka intresseanmälan" />
                    </div>
                </form>
            </div>
        </section>
    );
}
