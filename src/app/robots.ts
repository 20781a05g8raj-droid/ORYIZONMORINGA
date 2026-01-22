import { MetadataRoute } from 'next';

const BASE_URL = 'https://oryizon.com'; // Replace with actual domain

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/private/'],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
