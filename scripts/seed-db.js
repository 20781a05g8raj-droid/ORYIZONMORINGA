const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read env file manually
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        envConfig[match[1].trim()] = value;
    }
});

const connectionString = envConfig.POSTGRES_URL || envConfig.DATABASE_URL;

if (!connectionString) {
    console.error('No POSTGRES_URL found in .env.local');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const PRODUCTS = [
    {
        id: 'oryizon-gold-250g',
        title: 'Oryizon Gold - Organic Moringa Powder (250g)',
        price: 299.00,
        originalPrice: 399.00,
        rating: 5,
        image: '/product-1.png',
        images: ['/product-1.png', '/product-2.jpg', '/product-3.png', '/product-4.png'],
        description: 'Our flagship premium Moringa powder. Cold-pressed and sun-dried to preserve maximum potency.',
        ingredients: '100% Organic Moringa Oleifera Leaf Powder',
        benefits: ['Boosts Energy', 'Immune Support', 'Rich in Antioxidants', 'Anti-Inflammatory'],
        reviews: [
            { id: '1', author: 'Sarah M.', rating: 5, date: '10/12/2025', text: 'Changed my life! I feel so much more energetic.' },
            { id: '2', author: 'James K.', rating: 4, date: '11/05/2025', text: 'Great taste for a green powder. Mixes well.' }
        ]
    },
    {
        id: 'oryizon-capsules',
        title: 'Oryizon Vitality Capsules (60 count)',
        price: 24.99,
        originalPrice: 0,
        rating: 4,
        image: '/product-1.png',
        images: ['/product-1.png', '/product-2.jpg', '/product-3.png', '/product-4.png'],
        description: 'Concentrated Moringa extract in convenient vegetable capsules for on-the-go wellness.',
        ingredients: 'Organic Moringa Leaf Extract, Vegetable Cellulose Capsule',
        benefits: ['Convenient', 'High Potency', 'No Fillers'],
        reviews: []
    },
    {
        id: 'moringa-tea',
        title: 'Oryizon Zen - Moringa Tea Blend',
        price: 19.99,
        originalPrice: 22.99,
        rating: 5,
        image: '/product-1.png',
        images: ['/product-1.png', '/product-2.jpg', '/product-3.png', '/product-4.png'],
        description: 'A soothing blend of Moringa leaves with lemongrass and ginger.',
        ingredients: 'Moringa Leaves, Lemongrass, Ginger Root',
        benefits: ['Relaxation', 'Digestion Aid', 'Caffeine Free'],
        reviews: []
    },
    {
        id: 'oil-elixir',
        title: 'Oryizon Radiance Face Oil',
        price: 55.00,
        originalPrice: 0,
        rating: 5,
        image: '/product-1.png',
        images: ['/product-1.png', '/product-2.jpg', '/product-3.png', '/product-4.png'],
        description: 'Pure Moringa oil for glowing, hydrated skin.',
        ingredients: '100% Cold-Pressed Moringa Seed Oil',
        benefits: ['Hydrating', 'Anti-Aging', 'Non-Comedogenic'],
        reviews: []
    }
];

const BLOG_POSTS = [
    {
        id: '1',
        title: "The Miracle of Moringa",
        date: "October 12, 2025",
        author: "Dr. Elena Ray",
        excerpt: "Discover why this ancient superfood is taking the modern wellness world by storm.",
        content: `
            <p>Moringa oleifera, often called the "drumstick tree," "miracle tree," or "ben oil tree," has been used for centuries due to its medicinal properties and health benefits. It also has antifungal, antiviral, antidepressant, and anti-inflammatory properties.</p>
            <p>Native to India, it is now grown worldwide in tropical and subtropical regions. Every part of the tree is suitable for either nutritional or commercial purposes. The leaves are rich in many important nutrients, including protein, vitamin B6, vitamin C, riboflavin and iron.</p>
            <h3>Why is it a Superfood?</h3>
            <p>Moringa leaves are packed with antioxidants that protect cells from damage. It helps in reducing inflammation, lowering blood sugar levels, and lowering cholesterol. It is truly nature's multivitamin.</p>
        `,
        image: "https://placehold.co/800x500/1B3022/C5A059?text=Moringa+Tree"
    },
    {
        id: '2',
        title: "5 Ways to Use Oryizon Gold",
        date: "November 5, 2025",
        author: "Chef Marcus",
        excerpt: "From morning lattes to evening masks, explore the versatility of our organic powder.",
        content: `
            <p>Oryizon Gold powder is incredibly versatile. Its earthy, spinach-like flavor pairs well with many dishes. Here are our top 5 ways to use it:</p>
            <ol>
                <li><strong>Morning Smoothie:</strong> Blend 1 tsp with banana, spinach, and almond milk.</li>
                <li><strong>Superfood Latte:</strong> Whisk into warm oat milk with a dash of honey.</li>
                <li><strong>Green Guacamole:</strong> Stir into your favorite guac recipe for an antioxidant boost.</li>
                <li><strong>Pesto Pasta:</strong> Replace basil with Moringa leaves or powder.</li>
                <li><strong>Face Mask:</strong> Mix with water or yogurt for a glowing skin treatment.</li>
            </ol>
        `,
        image: "https://placehold.co/800x500/1B3022/C5A059?text=Smoothie+Bowl"
    },
    {
        id: '3',
        title: "Sustainability at the Source",
        date: "December 1, 2025",
        author: "Oryizon Team",
        excerpt: "How we ensure every leaf is harvested with respect for the earth and the farmer.",
        content: `
            <p>At Oryizon, we believe that true wellness encompasses the health of the planet. Our Moringa is sourced from 100% organic, regenerative farms that prioritize soil health and biodiversity.</p>
            <p>We work directly with farmers to ensure fair wages and ethical labor practices. By choosing Oryizon, you are supporting a supply chain that values transparency and sustainability.</p>
        `,
        image: "https://placehold.co/800x500/1B3022/C5A059?text=Sustainable+Farm"
    },
    {
        id: '4',
        title: "The Future of Wellness",
        date: "January 15, 2026",
        author: "Sarah Jenkins",
        excerpt: "Integrating ancient wisdom with modern science for peak performance.",
        content: `
            <p>The wellness industry is shifting from reactive to proactive. It's no longer just about fixing what's broken; it's about optimizing performance and longevity.</p>
            <p>Ancient wisdom, like Ayurveda, is meeting modern science. Oryizon stands at this intersection, providing time-tested superfoods backed by rigorous quality testing.</p>
        `,
        image: "https://placehold.co/800x500/1B3022/C5A059?text=Future+Wellness"
    }
];

const seedData = async () => {
    try {
        await client.connect();

        // Seed Products
        for (const p of PRODUCTS) {
            await client.query(`
                INSERT INTO products 
                (id, title, price, "originalPrice", rating, image, images, description, ingredients, benefits, reviews)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                ON CONFLICT (id) DO NOTHING;
             `, [
                p.id, p.title, p.price, p.originalPrice, p.rating, p.image, p.images, p.description, p.ingredients, p.benefits, JSON.stringify(p.reviews)
            ]);
        }
        console.log(`Seeded ${PRODUCTS.length} products.`);

        // Seed Posts
        for (const p of BLOG_POSTS) {
            await client.query(`
               INSERT INTO posts 
               (id, title, content, excerpt, date, author, image)
               VALUES ($1, $2, $3, $4, $5, $6, $7)
               ON CONFLICT (id) DO NOTHING;
            `, [
                p.id, p.title, p.content, p.excerpt, p.date, p.author, p.image
            ]);
        }
        console.log(`Seeded ${BLOG_POSTS.length} posts.`);

    } catch (err) {
        console.error('Error seeding:', err);
    } finally {
        await client.end();
    }
};

seedData();
