'use client';

import styles from './Search.module.css';

export default function SearchPage() {
    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Search Oryizon</h1>
                <div className={styles.searchBar}>
                    <input type="text" className={styles.input} placeholder="Search for products, ingredients, or articles..." autoFocus />
                    <button className={styles.button}>Search</button>
                </div>
                <div className={styles.quickLinks}>
                    <p>Popular Searches:</p>
                    <div className={styles.tags}>
                        <a href="/shop" className={styles.tag}>Moringa Powder</a>
                        <a href="/shop" className={styles.tag}>Oryizon Gold</a>
                        <a href="/method" className={styles.tag}>Sustainability</a>
                    </div>
                </div>
            </div>
        </main>
    );
}
