const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read env file manually since we are running a script outside Next.js context
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

const createTables = async () => {
    try {
        await client.connect();
        console.log('Connected to database...');

        // Products Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                price NUMERIC,
                "originalPrice" NUMERIC,
                rating NUMERIC,
                image TEXT,
                images TEXT[],
                description TEXT,
                ingredients TEXT,
                benefits TEXT[],
                reviews JSONB DEFAULT '[]'::jsonb,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Products table verified.');

        // Posts Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                excerpt TEXT,
                content TEXT,
                date TEXT,
                author TEXT,
                image TEXT,
                slug TEXT,
                "seoTitle" TEXT,
                "metaDescription" TEXT,
                "altText" TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Posts table verified.');

        // Orders Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                date TEXT,
                status TEXT,
                "trackingDetails" TEXT,
                items JSONB,
                total NUMERIC,
                customer JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Orders table verified.');

    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        await client.end();
    }
};

createTables();
