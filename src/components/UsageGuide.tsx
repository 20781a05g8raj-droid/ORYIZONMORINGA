'use client';

import styles from './UsageGuide.module.css';

export default function UsageGuide() {
    const guides = [
        {
            title: "Morning Boost",
            desc: "Mix 1 teaspoon of our organic moringa powder into your morning smoothie for natural energy.",
            img: "/usage-smoothie.png",
            step: "01"
        },
        {
            title: "Tea Infusion",
            desc: "Stir into hot water with lemon and honey. Unlocks moringa benefits for digestion.",
            img: "/usage-tea.png",
            step: "02"
        },
        {
            title: "Superfood Sprinkle",
            desc: "Simply sprinkle over salads, soups, or avocado toast for weight loss support.",
            img: "/usage-salad.png",
            step: "03"
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>How to Use Moringa</h2>
                <div className={styles.grid}>
                    {guides.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <img src={item.img} alt={item.title} className={styles.cardBg} />
                            <div className={styles.overlay}></div>
                            <span className={styles.stepNumber}>{item.step}</span>
                            <div className={styles.content}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardText}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
