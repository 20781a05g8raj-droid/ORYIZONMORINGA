'use client';

import { useRef } from 'react';
import styles from './UsageGuide.module.css';

export default function UsageGuide() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>How to Use Moringa Powder</h2>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.cardRelative}>
                            <span className={styles.stepNumber}>01</span>
                            <h3 className={styles.cardTitle}>Morning Boost</h3>
                            <p className={styles.cardText}>
                                Mix 1 teaspoon of our best organic moringa powder into your morning smoothie or juice for natural energy throughout the day.
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardRelative}>
                            <span className={styles.stepNumber}>02</span>
                            <h3 className={styles.cardTitle}>Tea Infusion</h3>
                            <p className={styles.cardText}>
                                Stir a spoonful into hot water with lemon and honey. Enjoy a soothing tea that unlocks moringa powder benefits for digestion.
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardRelative}>
                            <span className={styles.stepNumber}>03</span>
                            <h3 className={styles.cardTitle}>Superfood Sprinkle</h3>
                            <p className={styles.cardText}>
                                Simply sprinkle over salads, soups, or avocado toast. An easy way to use moringa powder for weight loss support in your diet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
