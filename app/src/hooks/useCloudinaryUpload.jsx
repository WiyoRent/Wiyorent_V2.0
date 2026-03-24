'use client';

import { useState } from 'react';

const compressImage = (file, maxWidthPx = 1920, quality = 0.82) => {
    return new Promise((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            const scale = Math.min(1, maxWidthPx / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
                (blob) => resolve(blob || file),
                'image/jpeg',
                quality
            );
        };
        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file);
        };
        img.src = objectUrl;
    });
};

export default function useCloudinaryUpload() {
    const [uploading, set_uploading] = useState(false);
    const [error, set_error] = useState(null);

    const upload = async (file, folder) => {
        set_uploading(true);
        set_error(null);
        try {
            // 1. Get signature from Next.js API route
            const signRes = await fetch('/api/upload/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder }),
            });
            if (!signRes.ok) throw new Error('Failed to get upload signature');
            const { signature, timestamp, cloud_name, api_key, folder: signedFolder } = await signRes.json();

            // 2. Compress the image
            const compressed = await compressImage(file);

            // 3. Upload directly to Cloudinary
            const formData = new FormData();
            formData.append('file', compressed);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', api_key);
            formData.append('folder', signedFolder);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                { method: 'POST', body: formData }
            );
            if (!uploadRes.ok) throw new Error('Cloudinary upload failed');
            const data = await uploadRes.json();
            return data.secure_url;
        } catch (err) {
            set_error(err.message);
            return null;
        } finally {
            set_uploading(false);
        }
    };

    return { upload, uploading, error };
}
