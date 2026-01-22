import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';

const BASE_URL = 'https://oryizon.com'; // Replace with actual domain when live

export default function sitemap(): MetadataRoute.Sitemap {
    // Static Routes
    const routes = [
        '',
        '/shop',
        '/blog',
        '/story',
        '/contact',
        '/usage',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Product Routes
    const products = PRODUCTS.map((product) => ({
        url: `${BASE_URL}/shop/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic Blog Routes
    const posts = BLOG_POSTS.map((post) => ({
        url: `${BASE_URL}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...products, ...posts];
}
