'use client';

import { useState, useCallback } from 'react';
import { useStore } from '@/context/StoreContext';
import styles from './Admin.module.css';

interface ImageUploaderProps {
    value: string;
    alt: string;
    onChange: (url: string, alt: string) => void;
    label?: string;
}

export default function ImageUploader({ value, alt, onChange, label }: ImageUploaderProps) {
    const { uploadImage } = useStore();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        const url = await uploadImage(file);
        setIsUploading(false);
        if (url) {
            onChange(url, alt); // Keep existing alt, update URL
        } else {
            alert('Upload failed. Please try again.');
        }
    };

    return (
        <div className={styles.uploaderContainer}>
            {label && <label className={styles.label}>{label}</label>}

            <div
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {value ? (
                    <div className={styles.preview}>
                        <img src={value} alt="Preview" />
                        <button className={styles.removeBtn} onClick={() => onChange('', '')}>×</button>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        {isUploading ? (
                            <span>Uploading...</span>
                        ) : (
                            <>
                                <span>Drag & Drop Image here</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>or</span>
                                <label className={styles.uploadBtn}>
                                    Browse Files
                                    <input type="file" hidden accept="image/*" onChange={handleFileSelect} />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </div>

            <input
                type="text"
                placeholder="Image Alt Text (for SEO)"
                value={alt}
                onChange={(e) => onChange(value, e.target.value)}
                className={styles.input}
                style={{ marginTop: '0.5rem' }}
            />
        </div>
    );
}
