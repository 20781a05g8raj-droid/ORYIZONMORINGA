import BlogGrid from '@/components/BlogGrid';
import styles from './BlogPage.module.css';

export default function BlogPage() {
    return (
        <main className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>The Oryizon Blog</h1>
                <p className={styles.subtitle}>Insights on wellness, sustainability, and the power of Moringa.</p>
            </section>

            <div className={styles.content}>
                <BlogGrid />
            </div>
        </main>
    );
}
