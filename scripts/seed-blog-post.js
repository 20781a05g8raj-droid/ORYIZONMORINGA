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

const NEW_BLOG_POST = {
    id: 'top-10-benefits-moringa-powder',
    title: 'The Top 10 Benefits of Moringa Powder',
    date: 'January 21, 2026',
    author: 'Dr. Ananya Sharma',
    excerpt: 'Unlock the full potential of this ancient superfood. From weight loss to glowing skin, discover why moringa is the ultimate wellness powerhouse.',
    seoTitle: 'Top 10 Moringa Powder Benefits | Organic Moringa for Weight Loss & Wellness',
    metaDescription: 'Discover the top 10 health benefits of moringa powder. Learn how organic moringa powder supports weight loss, boosts immunity, and enhances your skin.',
    altText: 'Organic moringa powder benefits for health and wellness',
    image: 'https://placehold.co/800x500/1B3022/C5A059?text=Moringa+Benefits',
    content: `
<p>Moringa powder, derived from the leaves of the <em>Moringa oleifera</em> tree, has earned its reputation as one of nature's most potent superfoods. Used for centuries in Ayurveda and traditional medicine, this "miracle tree" is now backed by modern science for its incredible health benefits. If you're searching for the <strong>best organic moringa powder</strong> and wondering <strong>how to use moringa powder</strong> for maximum impact, this guide is for you.</p>

<h2>1. Packed with Essential Nutrients</h2>
<p>Moringa is a nutritional powerhouse. Gram for gram, it contains more Vitamin C than oranges, more Vitamin A than carrots, more calcium than milk, and more potassium than bananas. It's nature's multivitamin in a single scoop.</p>

<h2>2. Supports Healthy Weight Loss</h2>
<p>Looking for <strong>moringa powder for weight loss</strong>? Moringa helps boost metabolism and reduce fat formation. Its high fiber content promotes satiety, helping you manage cravings and maintain a healthy caloric intake.</p>

<h2>3. Boosts Energy Levels Naturally</h2>
<p>Unlike caffeine, moringa provides a sustained energy boost without the jitters or crash. Many users report feeling more alert and focused after incorporating just one teaspoon into their morning routine.</p>

<h2>4. Powerful Anti-Inflammatory Properties</h2>
<p>Chronic inflammation is linked to various diseases, including heart disease and diabetes. Moringa contains isothiocyanates, which are potent anti-inflammatory compounds that help reduce inflammation at the cellular level.</p>

<h2>5. Rich in Antioxidants</h2>
<p>Moringa is loaded with antioxidants like quercetin, chlorogenic acid, and beta-carotene. These protect your cells from oxidative stress and free radical damage, slowing down the aging process and protecting vital organs.</p>

<h2>6. Supports Heart Health</h2>
<p>Studies suggest that moringa may help lower cholesterol levels and support healthy blood pressure. The antioxidants and anti-inflammatory compounds work together to support a healthy cardiovascular system.</p>

<h2>7. Stabilizes Blood Sugar Levels</h2>
<p>Moringa has been shown to help regulate blood sugar, making it a valuable addition for those managing pre-diabetes or Type 2 diabetes. The chlorogenic acid in moringa helps moderate blood sugar levels after meals.</p>

<h2>8. Enhances Skin and Hair Health</h2>
<p>The abundance of vitamins A, E, and antioxidants makes moringa excellent for skin health. It promotes collagen production, fights fine lines, and combats acne. Many users also notice stronger, shinier hair.</p>

<h2>9. Strengthens the Immune System</h2>
<p>A strong immune system is your body's first line of defense. The high Vitamin C content and other bioactive compounds in moringa stimulate immune cell production, helping you fight off infections and illnesses.</p>

<h2>10. Promotes Brain Health and Mental Clarity</h2>
<p>Moringa is a neuroprotective superfood. Its antioxidants support healthy brain function, improve memory, and may even help reduce the risk of neurodegenerative diseases like Alzheimer's.</p>

<hr/>

<h2>How to Use Moringa Powder</h2>
<p>Integrating moringa into your daily routine is simple:</p>
<ul>
    <li><strong>Morning Smoothie:</strong> Add 1 teaspoon to your favorite fruit or green smoothie.</li>
    <li><strong>Moringa Tea:</strong> Stir into hot water with lemon and honey for a soothing drink.</li>
    <li><strong>Superfood Sprinkle:</strong> Add to soups, salads, or avocado toast for a nutritional boost.</li>
    <li><strong>Energy Balls:</strong> Mix into homemade snack bites with oats and nut butter.</li>
</ul>

<h2>The Oryizon Difference</h2>
<p>At Oryizon, we source only the <strong>best organic moringa powder</strong> from regenerative, sustainable farms. Our moringa is carefully sun-dried and cold-processed to preserve maximum nutrient density. Experience nature's miracle with every scoop.</p>

<p><a href="/shop">Shop Our Premium Moringa Collection →</a></p>
    `
};

const seedBlogPost = async () => {
    try {
        await client.connect();
        console.log('Connected to database. Seeding new blog post...');

        await client.query(`
            INSERT INTO posts 
            (id, title, content, excerpt, date, author, image, "seoTitle", "metaDescription", "altText")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                content = EXCLUDED.content,
                excerpt = EXCLUDED.excerpt,
                date = EXCLUDED.date,
                author = EXCLUDED.author,
                image = EXCLUDED.image,
                "seoTitle" = EXCLUDED."seoTitle",
                "metaDescription" = EXCLUDED."metaDescription",
                "altText" = EXCLUDED."altText";
        `, [
            NEW_BLOG_POST.id,
            NEW_BLOG_POST.title,
            NEW_BLOG_POST.content,
            NEW_BLOG_POST.excerpt,
            NEW_BLOG_POST.date,
            NEW_BLOG_POST.author,
            NEW_BLOG_POST.image,
            NEW_BLOG_POST.seoTitle,
            NEW_BLOG_POST.metaDescription,
            NEW_BLOG_POST.altText
        ]);

        console.log('✓ Blog post seeded successfully: "The Top 10 Benefits of Moringa Powder"');

    } catch (err) {
        console.error('Error seeding blog post:', err);
    } finally {
        await client.end();
    }
};

seedBlogPost();
