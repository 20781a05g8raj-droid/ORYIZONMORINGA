'use client';

import { useAuth } from '@/context/AuthContext';
import { useStore, Product, BlogPost } from '@/context/StoreContext';
import styles from './Admin.module.css';
import ImageUploader from './ImageUploader';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
    const { user, isAdmin, isAuthenticated } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct, posts, addPost, updatePost, deletePost, orders, updateOrder, resetStore } = useStore();

    // State
    const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'orders'>('products');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [isNew, setIsNew] = useState(false);

    // Auth Check
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAuthenticated) redirect('/account');
            else if (!isAdmin) {
                alert("Access Denied.");
                redirect('/');
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, isAdmin]);

    if (!isAdmin) return <div className={styles.loading}>Verifying...</div>;

    // --- Product Handlers ---
    const startNewProduct = () => {
        setEditingId('new');
        setIsNew(true);
        setEditForm({
            id: `prod-${Date.now()}`,
            title: '', price: 0, originalPrice: 0, rating: 5,
            image: '/product.png', images: [],
            description: '', ingredients: '', benefits: []
        });
    };

    const editProduct = (p: Product) => {
        setEditingId(p.id);
        setIsNew(false);
        setEditForm({ ...p, images: p.images || [] });
    };

    const saveProduct = () => {
        const productData = {
            ...editForm,
            price: parseFloat(editForm.price) || 0,
            originalPrice: parseFloat(editForm.originalPrice) || 0
        };

        if (isNew) {
            addProduct(productData);
        } else {
            updateProduct(editForm.id, productData);
        }
        setEditingId(null);
    };

    // --- Blog Handlers ---
    const startNewPost = () => {
        setEditingId('new');
        setIsNew(true);
        setEditForm({
            id: `post-${Date.now()}`,
            title: '', excerpt: '', content: '',
            date: new Date().toLocaleDateString(), author: user?.name || 'Admin',
            image: '', seoTitle: '', metaDescription: '', altText: ''
        });
    };

    const editPost = (p: BlogPost) => {
        setEditingId(p.id);
        setIsNew(false);
        setEditForm({ ...p, seoTitle: p.seoTitle || '', metaDescription: p.metaDescription || '', altText: p.altText || '' });
    };

    const savePost = () => {
        if (isNew) {
            addPost(editForm);
        } else {
            updatePost(editForm.id, editForm);
        }
        setEditingId(null);
    };

    // Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditForm((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    // Array Handler (for Images/Benefits - simplified as comma separated string for now)
    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const val = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
        setEditForm((prev: any) => ({ ...prev, [field]: val }));
    };

    // --- Order Handlers ---
    const changeStatus = (id: string, newStatus: any) => {
        updateOrder(id, { status: newStatus });
    };

    const updateTracking = (id: string, details: string) => {
        updateOrder(id, { trackingDetails: details });
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <div className={styles.controls}>
                    <button className={`${styles.tabBtn} ${activeTab === 'products' ? styles.active : ''}`} onClick={() => { setActiveTab('products'); setEditingId(null); }}>Products</button>
                    <button className={`${styles.tabBtn} ${activeTab === 'blog' ? styles.active : ''}`} onClick={() => { setActiveTab('blog'); setEditingId(null); }}>Blog</button>
                    <button className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`} onClick={() => { setActiveTab('orders'); setEditingId(null); }}>Orders</button>
                    <button className={styles.resetBtn} onClick={resetStore}>Reset All Data</button>
                </div>
            </div>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{activeTab === 'products' ? 'Manage Products' : activeTab === 'blog' ? 'Manage Blog Posts' : 'Manage Orders'}</h2>
                    {activeTab !== 'orders' && (
                        <button className={styles.createBtn} onClick={activeTab === 'products' ? startNewProduct : startNewPost}>
                            + Add New {activeTab === 'products' ? 'Product' : 'Post'}
                        </button>
                    )}
                </div>

                {/* --- PRODUCTS TAB --- */}
                {activeTab === 'products' && (
                    <div className={styles.grid}>
                        {(editingId === 'new' && isNew) && (
                            <div className={styles.editCard}>
                                <h3>New Product</h3>
                                <ProductForm
                                    form={editForm}
                                    setForm={setEditForm}
                                    onChange={handleChange}
                                    onArrayChange={handleArrayChange}
                                    onSave={saveProduct}
                                    onCancel={() => setEditingId(null)}
                                />
                            </div>
                        )}
                        {products.map(p => (
                            <div key={p.id} className={styles.card}>
                                {editingId === p.id ? (
                                    <ProductForm
                                        form={editForm}
                                        setForm={setEditForm}
                                        onChange={handleChange}
                                        onArrayChange={handleArrayChange}
                                        onSave={saveProduct}
                                        onCancel={() => setEditingId(null)}
                                    />
                                ) : (
                                    <>
                                        <div className={styles.info}>
                                            <h4>{p.title}</h4>
                                            <p>₹{p.price}</p>
                                        </div>
                                        <div className={styles.actions}>
                                            <button onClick={() => editProduct(p)} className={styles.editBtn}>Edit</button>
                                            <button onClick={() => { if (confirm('Delete?')) deleteProduct(p.id); }} className={styles.deleteBtn}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* --- BLOG TAB --- */}
                {activeTab === 'blog' && (
                    <div className={styles.list}>
                        {(editingId === 'new' && isNew) && (
                            <div className={styles.editCard}>
                                <h3>New Post</h3>
                                <BlogForm form={editForm} setForm={setEditForm} onChange={handleChange} onSave={savePost} onCancel={() => setEditingId(null)} />
                            </div>
                        )}
                        {posts.map(p => (
                            <div key={p.id} className={styles.card}>
                                {editingId === p.id ? (
                                    <BlogForm form={editForm} setForm={setEditForm} onChange={handleChange} onSave={savePost} onCancel={() => setEditingId(null)} />
                                ) : (
                                    <>
                                        <div className={styles.info}>
                                            <h4>{p.title}</h4>
                                            <p className={styles.meta}>{p.date} • {p.author}</p>
                                        </div>
                                        <div className={styles.actions}>
                                            <button onClick={() => editPost(p)} className={styles.editBtn}>Edit</button>
                                            <button onClick={() => { if (confirm('Delete?')) deletePost(p.id); }} className={styles.deleteBtn}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* --- ORDERS TAB --- */}
                {activeTab === 'orders' && (
                    <div className={styles.list}>
                        {orders.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>No orders placed yet.</p>}
                        {orders.map(order => (
                            <div key={order.id} className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                                    <h4>{order.id}</h4>
                                    <span style={{ fontSize: '0.9rem', color: '#888' }}>{order.date}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Customer:</p>
                                        <p>{order.customer.name}</p>
                                        <p style={{ fontSize: '0.85rem', color: '#666' }}>{order.customer.email}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Summary:</p>
                                        <p>{order.items.length} items</p>
                                        <p style={{ fontWeight: 'bold' }}>Total: ₹{order.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Status & Tracking Actions */}
                                <div style={{ marginTop: '0.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', minWidth: '80px' }}>Status:</label>
                                        <select
                                            value={order.status}
                                            onChange={(e) => changeStatus(order.id, e.target.value)}
                                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                        <span style={{
                                            marginLeft: 'auto',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            background: order.status === 'Delivered' ? '#2ecc71' : order.status === 'Shipped' ? '#3498db' : '#f1c40f',
                                            color: 'white'
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', minWidth: '80px' }}>Tracking:</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. FedEx: 12345ABC"
                                            value={order.trackingDetails || ''}
                                            onChange={(e) => updateTracking(order.id, e.target.value)}
                                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', flex: 1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

// Sub-components for Form
function ProductForm({ form, setForm, onChange, onArrayChange, onSave, onCancel }: any) {

    const handleMainUpdate = (url: string, alt: string) => {
        setForm((prev: any) => ({ ...prev, image: url, imageAlt: alt }));
    };

    const handleGalleryUpdate = (index: number, url: string, alt: string) => {
        setForm((prev: any) => {
            const newImages = [...(prev.images || [])];
            const newAlts = [...(prev.imagesAlt || [])];

            // Ensure arrays are long enough (fill with empty strings if not)
            while (newAlts.length < newImages.length) newAlts.push('');

            if (!url) {
                // Remove if URL is empty (delete action)
                newImages.splice(index, 1);
                newAlts.splice(index, 1);
            } else {
                newImages[index] = url;
                newAlts[index] = alt;
            }

            return { ...prev, images: newImages, imagesAlt: newAlts };
        });
    };

    const addGalleryPlaceholder = () => {
        setForm((prev: any) => ({
            ...prev,
            images: [...(prev.images || []), ''],
            imagesAlt: [...(prev.imagesAlt || []), '']
        }));
    };

    return (
        <div className={styles.formGrid}>
            <input name="title" value={form.title} onChange={onChange} placeholder="Title" className={styles.input} />
            <div className={styles.row}>
                <input name="price" type="number" value={form.price} onChange={onChange} placeholder="Price" className={styles.input} />
                <input name="originalPrice" type="number" value={form.originalPrice} onChange={onChange} placeholder="Orig. Price" className={styles.input} />
            </div>
            <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" className={styles.textarea} />
            <textarea name="ingredients" value={form.ingredients} onChange={onChange} placeholder="Ingredients" className={styles.textarea} />

            <label className={styles.label}>Main Image</label>
            <ImageUploader
                value={form.image}
                alt={form.imageAlt || ''}
                onChange={handleMainUpdate}
            />

            <label className={styles.label}>Gallery Images</label>
            <div className={styles.galleryGrid} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {(form.images || []).map((img: string, i: number) => (
                    <ImageUploader
                        key={i}
                        value={img}
                        alt={(form.imagesAlt || [])[i] || ''}
                        label={`Image ${i + 1}`}
                        onChange={(url, alt) => handleGalleryUpdate(i, url, alt)}
                    />
                ))}
                {/* Add New Button */}
                <button
                    className={styles.uploadBtn}
                    style={{ height: '100%', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', border: '2px dashed #ccc' }}
                    onClick={addGalleryPlaceholder}
                >
                    + Add Another Image
                </button>
            </div>

            <label className={styles.label}>Benefits (Comma separated)</label>
            <input
                value={form.benefits?.join(', ') || ''}
                onChange={(e) => onArrayChange(e, 'benefits')}
                placeholder="Energy, Immunity..."
                className={styles.input}
            />

            <div className={styles.formActions}>
                <button onClick={onSave} className={styles.saveBtn}>Save</button>
                <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            </div>
        </div>
    );
}

function BlogForm({ form, setForm, onChange, onSave, onCancel }: any) {

    const handleImageUpdate = (url: string, alt: string) => {
        setForm((prev: any) => ({ ...prev, image: url, altText: alt }));
    };

    return (
        <div className={styles.formGrid}>
            <input name="title" value={form.title} onChange={onChange} placeholder="Post Title" className={styles.input} />
            <input name="slug" value={form.slug || ''} onChange={onChange} placeholder="URL Slug (Optional)" className={styles.input} />
            <div className={styles.row}>
                <input name="author" value={form.author} onChange={onChange} placeholder="Author" className={styles.input} />
                <input name="date" value={form.date} onChange={onChange} placeholder="Date" className={styles.input} />
            </div>

            <label className={styles.label}>Featured Image</label>
            <ImageUploader
                value={form.image}
                alt={form.altText || ''}
                onChange={handleImageUpdate}
            />

            <textarea name="excerpt" value={form.excerpt} onChange={onChange} placeholder="Short Excerpt" className={styles.textarea} />
            <textarea name="content" value={form.content} onChange={onChange} placeholder="HTML Content (Keep it simple)" className={styles.textarea} style={{ height: '300px' }} />

            <h4 className={styles.subHead}>SEO Settings</h4>
            <input name="seoTitle" value={form.seoTitle || ''} onChange={onChange} placeholder="SEO Title (Browser Title)" className={styles.input} />
            <textarea name="metaDescription" value={form.metaDescription || ''} onChange={onChange} placeholder="Meta Description (Search Engine Snippet)" className={styles.textarea} />
            {/* Alt Text is handled by ImageUploader now, but we can keep a fallback input or rely on the uploader */}

            <div className={styles.formActions}>
                <button onClick={onSave} className={styles.saveBtn}>Save Post</button>
                <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
            </div>
        </div>
    );
}
