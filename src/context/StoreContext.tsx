'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/posts';

// Define Types
export type Product = {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;
    images?: string[];
    description: string;
    ingredients: string;
    benefits: string[];
    reviews: any[];
};

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
    slug?: string;
    seoTitle?: string;
    metaDescription?: string;
    altText?: string;
};

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered';

export type Order = {
    id: string;
    date: string;
    status: OrderStatus;
    trackingDetails?: string; // e.g. "FedEx: 123456"
    items: any[];
    total: number;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
};

type StoreContextType = {
    products: Product[];
    posts: BlogPost[];
    orders: Order[];

    // Product Actions
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    // Blog Actions
    addPost: (post: BlogPost) => void;
    updatePost: (id: string, updates: Partial<BlogPost>) => void;
    deletePost: (id: string) => void;

    // Order Actions
    addOrder: (order: Order) => void;
    updateOrder: (id: string, updates: Partial<Order>) => void;

    resetStore: () => void;
};

// ...

// --- Order Actions ---

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize Store
    useEffect(() => {
        // Load Products
        const savedProducts = localStorage.getItem('oryizon_products');
        if (savedProducts) {
            let parsed = JSON.parse(savedProducts);
            // Migration: Ensure 'images' array exists or update if it contains old/default images
            parsed = parsed.map((p: Product) => {
                const staticData = PRODUCTS.find((d: any) => d.id === p.id);
                // Check if current images are missing, empty, only have default, OR contain the old 'product2.png' etc which we just replaced
                const needsUpdate = !p.images ||
                    p.images.length === 0 ||
                    (p.images.length === 1 && p.images[0] === '/product.png') ||
                    p.images.some(img => img.includes('product2.png') || img.includes('product3.png') || img.includes('product4.png'));

                if (staticData?.images && needsUpdate) {
                    return { ...p, images: staticData.images, image: staticData.image };
                }
                return p;
            });
            setProducts(parsed);
        } else {
            setProducts(PRODUCTS as Product[]);
        }

        // Load Posts
        const savedPosts = localStorage.getItem('oryizon_posts');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        } else {
            setPosts(BLOG_POSTS as BlogPost[]);
        }

        // Load Orders
        const savedOrders = localStorage.getItem('oryizon_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }

        setIsLoaded(true);
    }, []);

    // Persist Store
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('oryizon_products', JSON.stringify(products));
            localStorage.setItem('oryizon_posts', JSON.stringify(posts));
            localStorage.setItem('oryizon_orders', JSON.stringify(orders));
        }
    }, [products, posts, orders, isLoaded]);

    // --- Product Actions ---
    const addProduct = (product: Product) => {
        setProducts(prev => [product, ...prev]);
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    // --- Blog Actions ---
    const addPost = (post: BlogPost) => {
        setPosts(prev => [post, ...prev]);
    };

    const updatePost = (id: string, updates: Partial<BlogPost>) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deletePost = (id: string) => {
        setPosts(prev => prev.filter(p => p.id !== id));
    };

    // --- Order Actions ---
    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    const updateOrder = (id: string, updates: Partial<Order>) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    };

    const resetStore = () => {
        setProducts(PRODUCTS as Product[]);
        setPosts(BLOG_POSTS as BlogPost[]);
        setOrders([]);
        localStorage.removeItem('oryizon_products');
        localStorage.removeItem('oryizon_posts');
        localStorage.removeItem('oryizon_orders');
    };

    if (!isLoaded) return null;

    return (
        <StoreContext.Provider value={{
            products, posts, orders,
            addProduct, updateProduct, deleteProduct,
            addPost, updatePost, deletePost,
            addOrder, updateOrder,
            resetStore
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
