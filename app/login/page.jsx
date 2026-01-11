'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext';

export default function Login() {
    const router = useRouter();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // If user is already logged in, redirect to profile
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/profile');
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Admin Login Check
        if (formData.email === 'Admin' && formData.password === '@Parth2209') {
            setLoading(true);
            localStorage.setItem('isAdmin', 'true');
            showToast('Welcome Admin! Redirecting to Dashboard...', 'success');
            setTimeout(() => {
                window.location.href = '/admin/dashboard';
            }, 1000);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                // Store user data in localStorage for session
                localStorage.setItem('user', JSON.stringify(data.user));
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    // Force reload to update CartContext with new user
                    window.location.href = '/profile';
                }, 1500);
            } else {
                showToast(data.message || 'Invalid credentials', 'error');
            }
        } catch (err) {
            showToast('Failed to login. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <br />
            <main className="bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8">
                <div className="bg-white rounded-2xl p-3 sm:p-4">
                    
                    {/* Breadcrumb */}
                    <div className="mb-6 text-black">
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-black hover:underline font-medium">Home</Link>
                            <span className="text-black">/</span>
                            <span className="text-black font-semibold">Login</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="max-w-md mx-auto">
                        <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8 mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                                WELCOME BACK
                            </h1>
                            <p className="text-base text-black">
                                Login to access your account
                            </p>
                        </div>

                        <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8">
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg font-semibold">
                                    ✓ {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Email or Phone Number</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="john@example.com or 9876543210"
                                    />
                                    <p className="text-xs text-gray-600 mt-1">Enter your email address or phone number</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-black">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="font-bold hover:underline">
                                        Sign up here
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
