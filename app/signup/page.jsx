'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext';

export default function Signup() {
    const router = useRouter();
    const { showToast, clearAllToasts } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    
    // OTP States
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Password Visibility States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Resend OTP Timer
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Reset verification if phone changes
        if (e.target.name === 'phone') {
            setIsPhoneVerified(false);
            setOtpSent(false);
            setOtp('');
            setGeneratedOtp('');
        }
    };


    const handleSendOtp = async () => {
        if (!formData.phone || formData.phone.length < 10) {
            showToast('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: formData.phone })
            });
            const data = await res.json();

            if (res.ok) {
                setGeneratedOtp(data.otp); // Save the OTP the server generated
                setOtpSent(true);
                setResendTimer(30); // Start 30 second countdown
                
                // Show OTP in toast notification (bottom-right)
                showToast(`Your OTP: ${data.otp} (Valid for 10 minutes)`, 'success', 10000);
            } else {
                showToast(data.message || 'Failed to send OTP', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Error connecting to OTP service', 'error');
        }
    };


    const handleVerifyOtp = async () => {
        // Close OTP toast notification immediately when verify is pressed
        clearAllToasts();
        
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: formData.phone, otp: otp })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsPhoneVerified(true);
                setError('');
                showToast('✅ Phone verified successfully!', 'success');
            } else {
                showToast(data.message || 'Invalid OTP. Please try again.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Verification failed. Please try again.', 'error');
        }
    };

    const handleChangeNumber = () => {
        setOtpSent(false);
        setOtp('');
        setGeneratedOtp('');
        setResendTimer(0);
        setFormData({ ...formData, phone: '' });
        showToast('You can now enter a new phone number', 'info');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation Checks
        if (!formData.name?.trim()) {
            showToast('Please enter your full name.', 'warning');
            return;
        }
        if (!formData.email?.trim()) {
            showToast('Please enter your email address.', 'warning');
            return;
        }
        if (!formData.password) {
            showToast('Please enter a password.', 'warning');
            return;
        }
        if (!formData.confirmPassword) {
            showToast('Please confirm your password.', 'warning');
            return;
        }
        if (!formData.phone?.trim()) {
            showToast('Please enter your phone number.', 'warning');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        if (!isPhoneVerified) {
            showToast('Please verify your phone number first', 'warning');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                })
            });

            const data = await res.json();

            if (res.ok) {
                showToast('🎉 Account created successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                showToast(data.message || 'Something went wrong', 'error');
            }
        } catch (err) {
            showToast('Failed to create account. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <br />
            {/* Main Container - matched with About page */}
            <main className="bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8">
                <div className="bg-white rounded-2xl p-3 sm:p-4">
                    
                    {/* Breadcrumb */}
                    <div className="mb-8 text-black">
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-black hover:underline font-medium">Home</Link>
                            <span className="text-black">/</span>
                            <span className="text-black font-semibold">Sign Up</span>
                        </div>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg font-semibold">
                            ✓ {success}
                        </div>
                    )}

                    {/* Split Layout Form Container */}
                    <div className="bg-[#f5f5f5] rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            
                            {/* Left Column: Headers & Basic Info */}
                            <div className="space-y-6">
                                {/* Header Section */}
                                <div>
                                    <h1 className="text-2xl font-bold text-black mb-2">
                                        CREATE ACCOUNT
                                    </h1>
                                    <p className="text-base text-black">
                                        Join Glamora and start shopping!
                                    </p>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="John Doe"
                                        />
                                        <p className="mt-1 text-xs text-gray-600">Please enter your full name as per official documents</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                minLength={6}
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

                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                minLength={6}
                                                className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                                            >
                                                {showConfirmPassword ? (
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
                                </div>
                            </div>

                            {/* Right Column: Phone, Submit, Login */}
                            <div className="flex flex-col justify-center space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Phone Number</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                // Only allow numbers
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                setFormData({
                                                    ...formData,
                                                    phone: value
                                                });
                                            }}
                                            disabled={isPhoneVerified || otpSent}
                                            maxLength={10}
                                            pattern="[0-9]{10}"
                                            className={`w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black ${isPhoneVerified ? 'bg-green-50 text-green-800 border border-green-300' : ''} ${otpSent && !isPhoneVerified ? 'bg-gray-100' : ''}`}
                                            placeholder="9876543210"
                                        />
                                        {!isPhoneVerified && !otpSent && (
                                            <button 
                                                type="button" 
                                                onClick={handleSendOtp}
                                                className="px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 shrink-0"
                                            >
                                                Send OTP
                                            </button>
                                        )}
                                        {isPhoneVerified && (
                                            <span className="flex items-center justify-center px-4 py-2 bg-green-500 text-white font-bold rounded-lg shrink-0">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Enter 10-digit mobile number (numbers only)</p>
                                    
                                    {otpSent && !isPhoneVerified && (
                                        <div className="mt-2 flex gap-2 animate-fade-in">
                                            <input 
                                                type="text" 
                                                value={otp}
                                                onChange={(e) => {
                                                    // Only allow numbers, max 6 digits
                                                    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                                                    setOtp(value);
                                                }}
                                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-black text-black placeholder:text-gray-500 bg-white"
                                                placeholder="Enter 6-digit OTP"
                                                maxLength={6}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={handleVerifyOtp}
                                                className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shrink-0"
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    )}
                                    
                                    {otpSent && !isPhoneVerified && (
                                        <div className="mt-3 flex items-center justify-between text-sm">
                                            <button
                                                type="button"
                                                onClick={handleSendOtp}
                                                disabled={resendTimer > 0}
                                                className={`font-semibold transition-colors ${resendTimer > 0 ? 'text-gray-400' : 'text-black hover:underline cursor-pointer'}`}
                                            >
                                                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleChangeNumber}
                                                className="text-black font-semibold hover:underline active:text-gray-600 transition-colors cursor-pointer"
                                            >
                                                Change Number
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-lg hover:bg-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                                    >
                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                    </button>

                                    <div className="mt-4 text-center">
                                        <p className="text-gray-600">
                                            Already have an account?{' '}
                                            <Link href="/login" className="text-black font-bold hover:underline">
                                                Login here
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <br />
        </div>
    );
}
