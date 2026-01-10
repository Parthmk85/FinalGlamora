'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
            setSuccess('Welcome Admin! Redirecting to Dashboard...');
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
                setSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    // Force reload to update CartContext with new user
                    window.location.href = '/profile';
                }, 1500);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Failed to login');
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
                    <div className="mb-6">
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
                                    <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="••••••••"
                                    />
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
