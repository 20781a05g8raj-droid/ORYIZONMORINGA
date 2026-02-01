import { createClient } from '@supabase/supabase-js';

// Read env from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://odkpaxyusmlzdsjbeafi.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_eGSgcSJgD81rJHYyINoRGA_VOf3Yff9';

const supabase = createClient(supabaseUrl, supabaseKey);

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
        reviews: []
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
        // Delete existing data
        await supabase.from('products').delete().neq('id', '');
        await supabase.from('posts').delete().neq('id', '');

        console.log('Deleted existing data...');

        // Insert Products
        const { error: prodError } = await supabase.from('products').insert(PRODUCTS);
        if (prodError) {
            console.error('Error inserting products:', prodError);
        } else {
            console.log(`✓ Seeded ${PRODUCTS.length} products`);
        }

        // Insert Posts
        const { error: postError } = await supabase.from('posts').insert(BLOG_POSTS);
        if (postError) {
            console.error('Error inserting posts:', postError);
        } else {
            console.log(`✓ Seeded ${BLOG_POSTS.length} blog posts`);
        }

        console.log('\n✓ Database seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding:', err);
        process.exit(1);
    }
};

seedData();
