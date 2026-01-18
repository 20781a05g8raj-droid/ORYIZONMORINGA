'use client';

import styles from './Story.module.css';

export default function StoryPage() {
    return (
        <main className={styles.container}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Rooted in Purity.</h1>
                    <p className={styles.subtitle}>
                        From the fertile soils of ancient farms to your daily ritual.<br />
                        This is the story of Oryizon.
                    </p>
                </div>
                <img
                    src="https://placehold.co/1920x1080/1B3022/FFFFFF?text=Nature%27s+Landscape"
                    alt="Abstract Nature"
                    className={styles.bgImage}
                />
            </section>

            {/* Origin Story */}
            <section className={styles.section}>
                <div className={styles.grid}>
                    <div className={styles.textBlock}>
                        <h2>The Origin</h2>
                        <p>
                            Oryizon began with a simple question: "How can we bring the unadulterated power of nature to the modern world without compromising on purity?"
                        </p>
                        <p>
                            Travels to the remote regions of India introduced us to the "Miracle Tree," Moringa Oleifera. Witnessing its impact on local communities—providing energy, immune support, and vitality—we knew this was the answer.
                        </p>
                    </div>
                    <div className={styles.imageBlock}>
                        <img
                            src="https://placehold.co/800x1000/C5A059/FFFFFF?text=Moringa+Leaves"
                            alt="Moringa Leaves"
                        />
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className={styles.values}>
                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <h3>Regenerative Farming</h3>
                        <p>We don't just harvest; we heal the soil. Our partners use regenerative practices that sequester carbon and restore biodiversity.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Peak Potency</h3>
                        <p>Freeze-dried within hours of harvest to lock in maximum nutrients. No fillers, no additives, just pure plant power.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3>Transparent Impact</h3>
                        <p>We believe you have the right to know what's in your body. Every batch is lab-tested and traceable to the source.</p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className={styles.section}>
                <div className={styles.grid}>
                    <div className={styles.imageBlock}>
                        <img
                            src="https://placehold.co/800x1000/1B3022/FFFFFF?text=Modern+Wellness"
                            alt="Wellness Routine"
                        />
                    </div>
                    <div className={styles.textBlock}>
                        <h2>The Future</h2>
                        <p>
                            Wellness isn't a destination; it's a horizon we chase every day. Oryizon is dedicated to fueling that journey with the highest quality superfoods on the planet.
                        </p>
                        <p>
                            Join us as we redefine what it means to live vivaciously.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
