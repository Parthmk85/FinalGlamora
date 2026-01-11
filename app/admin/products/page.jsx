'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminProducts() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: '', message: '' });

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (data.products) {
                // Sort by createdAt desc if available
                const sorted = data.products.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                    return dateB - dateA;
                });
                setProducts(sorted);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setStatus({ type: 'error', message: 'Failed to load products' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
        } else {
            fetchProducts();
        }
    }, [router]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        
        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setStatus({ type: 'success', message: '✓ Product (Card) Deleted Successfully!' });
                setProducts(products.filter(p => p._id !== id && p.id !== id));
                setTimeout(() => setStatus({ type: '', message: '' }), 3000);
            } else {
                setStatus({ type: 'error', message: 'Failed to delete product' });
            }
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: 'Error deleting product' });
        }
    };



    if (loading) return <div className="p-10 text-center font-bold">Loading Products...</div>;

    return (
        <div className="bg-[#f5f5f5] text-black font-satoshi">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Products (Cards)</h1>
                </div>

                {/* Status Message */}
                {status.message && (
                    <div className={`mb-6 p-4 rounded-lg text-white font-bold text-center shadow-md animate-pulse ${
                        status.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                        {status.message}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Brand</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Color</th>
                                    <th className="p-4">Sizes</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Date Added</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id || product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                                                <Image 
                                                    src={product.image} 
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold">{product.name}</td>
                                        <td className="p-4 text-gray-700 font-medium">{product.brand || '-'}</td>
                                        <td className="p-4 text-gray-600">{product.category}</td>
                                        <td className="p-4 text-gray-600">{product.color || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {product.sizes && product.sizes.length > 0 ? (
                                                    product.sizes.map(size => (
                                                        <span key={size} className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-bold text-gray-700">
                                                            {size}
                                                        </span>
                                                    ))
                                                ) : <span className="text-gray-400">-</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-green-700">${product.price}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button 
                                                onClick={() => handleDelete(product._id || product.id)}
                                                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="p-8 text-center text-gray-500 italic">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
