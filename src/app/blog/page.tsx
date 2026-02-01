import BlogGrid from '@/components/BlogGrid';
import PageHero from '@/components/PageHero';
import styles from './BlogPage.module.css';

export default function BlogPage() {
    return (
        <main className={styles.container}>
            <PageHero
                title="Our Stories"
                subtitle="Insights on health, wellness, and the power of Moringa."
                image="/hero-blog-v2.png"
            />

            <div className={styles.content}>
                <BlogGrid />
            </div>
        </main>
    );
}
