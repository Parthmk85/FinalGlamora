'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

        // Load user data
        const userData = JSON.parse(user);
        setUserInfo({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
        });
        setLoading(false);
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setIsEditing(false);
        
        try {
            // Update in database
            const currentUser = JSON.parse(localStorage.getItem('user'));
            
            const res = await fetch('/api/auth/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentUser.id,
                    name: userInfo.name,
                    email: currentUser.email,
                    phone: userInfo.phone,
                    address: userInfo.address
                })
            });

            const data = await res.json();

            if (res.ok) {
                // Update localStorage with new data
                const updatedUser = { ...currentUser, ...userInfo };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        } catch (error) {
            alert('Failed to update profile');
            console.error('Update error:', error);
        }
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        // Clear user session
        localStorage.removeItem('user');
        // Force reload to clear CartContext state
        window.location.href = '/login';
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-black">Loading...</p>
            </div>
        );
    }

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
                            <span className="text-black font-semibold">My Profile</span>
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8 md:p-10 mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
                            MY PROFILE
                        </h1>
                        <p className="text-base sm:text-lg text-black">
                            Manage your account information and preferences
                        </p>
                    </div>

                    {/* Profile Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Left Side - Profile Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-black">Personal Information</h2>
                                    <button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
                                    >
                                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={userInfo.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none transition-all disabled:opacity-60"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none transition-all disabled:opacity-60"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={userInfo.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none transition-all disabled:opacity-60"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Address</label>
                                        <textarea
                                            name="address"
                                            value={userInfo.address}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows="3"
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none transition-all disabled:opacity-60 resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {isEditing && (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-black"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>

                            {/* Logout Confirmation Banner */}
                            {showLogoutConfirm && (
                                <div className="mt-6 bg-red-100 border-2 border-red-400 rounded-2xl p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="shrink-0">
                                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ Confirm Logout</h3>
                                            <p className="text-red-700 mb-4">
                                                Are you sure you want to logout? You will need to login again to access your account.
                                            </p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={confirmLogout}
                                                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                                                >
                                                    Yes, Logout
                                                </button>
                                                <button
                                                    onClick={cancelLogout}
                                                    className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-black"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Side - Quick Actions */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#f5f5f5] rounded-2xl shadow-lg p-6 sticky top-4">
                                <h3 className="text-xl font-bold text-black mb-6">Quick Actions</h3>
                                
                                <div className="space-y-4">
                                    {/* My Orders */}
                                    <Link href="/cart" className="block">
                                        <div className="bg-white text-black rounded-xl p-4 hover:bg-black hover:text-white transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all">
                                                    <svg className="w-6 h-6 text-white group-hover:text-black transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">My Cart</h4>
                                                    <p className="text-xs opacity-80">View cart items</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Shop */}
                                    <Link href="/shop" className="block">
                                        <div className="bg-white text-black rounded-xl p-4 hover:bg-black hover:text-white transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all">
                                                    <svg className="w-6 h-6 text-white group-hover:text-black transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">Continue Shopping</h4>
                                                    <p className="text-xs opacity-80">Browse products</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Contact */}
                                    <Link href="/contact" className="block">
                                        <div className="bg-white text-black rounded-xl p-4 hover:bg-black hover:text-white transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all">
                                                    <svg className="w-6 h-6 text-white group-hover:text-black transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">Contact Support</h4>
                                                    <p className="text-xs opacity-80">Get help</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Logout */}
                                    <button onClick={handleLogout} className="block w-full">
                                        <div className="bg-white text-black rounded-xl p-4 hover:bg-red-600 hover:text-white transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all">
                                                    <svg className="w-6 h-6 text-white group-hover:text-red-600 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm">Logout</h4>
                                                    <p className="text-xs opacity-80">Sign out of account</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
