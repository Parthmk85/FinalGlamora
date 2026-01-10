'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        category: 'menFashion',
        image: '',
        description: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        router.push('/admin/login');
    };

    const handleChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        
        // Prepare final form data (Clone it)
        let finalProductData = { ...productForm };

        // 1. Upload File if selected
        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const uploadData = await uploadRes.json();
                
                if (uploadRes.ok) {
                    finalProductData.image = uploadData.url; // Use the uploaded URL
                } else {
                    setStatus({ type: 'error', message: 'Image upload failed' });
                    setUploading(false);
                    return;
                }
            } catch (err) {
                console.error(err);
                setStatus({ type: 'error', message: 'Image upload error' });
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        // 2. Submit Product Data
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalProductData)
            });
            
            if (res.ok) {
                setStatus({ type: 'success', message: '✓ Product Added Successfully!' });
                setProductForm({ name: '', price: '', category: 'menFashion', image: '', description: '' });
                setSelectedFile(null);
                // Clear file input visually
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                // Clear message after 3 seconds
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            } else {
                setStatus({ type: 'error', message: 'Failed to add product' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Error adding product' });
        }
    };

    if (loading) return <div className="p-10 text-center">Checking Access...</div>;

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-6 sm:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/users" className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-all">
                            Manage Users
                        </Link>
                        <Link href="/admin/products" className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-all">
                            Manage Products
                        </Link>
                        <Link href="/admin/messages" className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-all">
                            View Messages
                        </Link>
                        <Link href="/shop" className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 border border-gray-300">
                            View Shop
                        </Link>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h2 className="text-xl font-bold text-black mb-6">Add New Product</h2>
                    
                    {status.message && (
                        <div className={`p-4 rounded-lg mb-6 ${
                            status.type === 'success' 
                                ? 'bg-green-100 border border-green-400 text-green-700' 
                                : 'bg-red-100 border border-red-400 text-red-700'
                        }`}>
                            <p className="font-bold">{status.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                    placeholder="e.g. Classic Black Jacket"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productForm.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                    placeholder="e.g. 150"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Category</label>
                                <select
                                    name="category"
                                    value={productForm.category}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                >
                                    <option value="menFashion">Men Fashion</option>
                                    <option value="womanFashion">Woman Fashion</option>
                                    <option value="shoesBag">Shoes & Bags</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black mb-1">Image (URL or Upload)</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        name="image"
                                        value={productForm.image}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                        placeholder="Paste image URL here"
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-500">OR</span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-black file:text-white
                                                file:cursor-pointer hover:file:bg-gray-800
                                            "
                                        />
                                    </div>
                                    {selectedFile && <p className="text-xs text-green-600 font-bold">Selected: {selectedFile.name}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-1">Description</label>
                            <textarea
                                name="description"
                                value={productForm.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                placeholder="Product details..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-lg disabled:opacity-50"
                        >
                            {uploading ? 'Uploading & Adding...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
