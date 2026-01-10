'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hardcoded check for Admin
        if (formData.username === 'Admin' && formData.password === '@Parth2209') {
            localStorage.setItem('isAdmin', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-black mb-6 text-center">Admin Login</h1>
                
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-black mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-black mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all"
                    >
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
