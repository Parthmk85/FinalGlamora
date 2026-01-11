'use client'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCartPage() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [selectedMainCategory, setSelectedMainCategory] = useState('menFashion');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Jacket & Coats', // Default to first subcategory of menFashion
        description: '',
        image: '',
        brand: '',
        color: 'Black',
        sizes: []
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    // Category Data
    const mainCategories = [
        { value: 'menFashion', label: 'Man Fashion' },
        { value: 'womanFashion', label: 'Woman Fashion' },
        { value: 'shoesBag', label: 'Shoes & Bag' },
        { value: 'accessories', label: 'Accessories' }
    ];

    const subCategories = {
        menFashion: ['Jacket & Coats', 'Shirts', 'T-shirts', 'Outer & Blazer', 'Hoodies', 'Jeans'],
        womanFashion: ['Dresses', 'Tops & Blouses', 'Skirts', 'Jeans & Pants'],
        shoesBag: ['Sneakers', 'Handbags', 'Boots', 'Backpacks'],
        accessories: ['Watches', 'Sunglasses', 'Belts', 'Jewelry']
    };

    const colors = ['Black', 'Grey', 'Red', 'Tosca', 'Brown', 'Purple', 'Green', 'Yellow', 'Blue', 'Cream', 'White'];
    const brandSuggestions = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Gucci', 'Uniqlo', 'Levis'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
        }
    }, [router]);

    // Update subcategory when main category changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, category: subCategories[selectedMainCategory][0] }));
    }, [selectedMainCategory]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSizeChange = (size) => {
        setFormData(prev => {
            if (prev.sizes.includes(size)) {
                return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
            } else {
                return { ...prev, sizes: [...prev.sizes, size] };
            }
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        
        let finalData = { ...formData };

        // 1. Upload File if selected
        if (selectedFile) {
            setUploading(true);
            const data = new FormData();
            data.append('file', selectedFile);

            try {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: data
                });
                const uploadResult = await uploadRes.json();
                
                if (uploadRes.ok) {
                    finalData.image = uploadResult.url;
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

        // 2. Submit Product
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });
            
            if (res.ok) {
                setStatus({ type: 'success', message: '✓ Product Added Successfully!' });
                // Reset Form (keep main category as is, reset subcat to default of current main)
                setFormData({
                    name: '',
                    price: '',
                    category: subCategories[selectedMainCategory][0],
                    description: '',
                    image: '',
                    brand: '',
                    color: 'Black',
                    sizes: []
                });
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            } else {
                setStatus({ type: 'error', message: 'Failed to add product' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Error adding product' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-black mb-6">Add New Shop Card (Product)</h2>
                
                {status.message && (
                    <div className={`p-4 rounded-lg mb-6 ${
                        status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        <p className="font-bold">{status.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                                placeholder="e.g. Urban Bomber Jacket"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                                placeholder="e.g. 199"
                            />
                        </div>
                    </div>

                    {/* Filter Inputs: Category (Main & Sub), Color, Brand */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Main Category</label>
                            <select
                                value={selectedMainCategory}
                                onChange={(e) => setSelectedMainCategory(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                            >
                                {mainCategories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Sub Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                            >
                                {subCategories[selectedMainCategory].map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Color</label>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                            >
                                {colors.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                list="brandSearchParams"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                                placeholder="Type or select brand"
                            />
                            <datalist id="brandSearchParams">
                                {brandSuggestions.map(b => <option key={b} value={b} />)}
                            </datalist>
                        </div>
                    </div>

                    {/* Sizes - Checkboxes */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Available Sizes</label>
                        <div className="flex flex-wrap gap-3">
                            {availableSizes.map(size => (
                                <label key={size} className={`
                                    cursor-pointer px-4 py-2 rounded-lg border transition-all text-sm font-semibold
                                    ${formData.sizes.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black'}
                                `}>
                                    <input
                                        type="checkbox"
                                        checked={formData.sizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                        className="hidden"
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Product Image</label>
                        <div className="space-y-3">
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                                placeholder="Paste image URL here..."
                            />
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-gray-500">OR UPLOAD</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white file:cursor-pointer"
                                />
                            </div>
                            {selectedFile && <p className="text-xs text-green-600 font-bold">File Selected: {selectedFile.name}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-black"
                            placeholder="Detailed product description..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-lg disabled:opacity-50"
                    >
                        {uploading ? 'Uploading & Saving...' : 'Add Shop Card'}
                    </button>
                </form>
            </div>
        </div>
    );
}
