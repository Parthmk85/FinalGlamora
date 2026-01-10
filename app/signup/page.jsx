'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
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

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
            setError('Please enter a valid phone number');
            return;
        }
        setError('');
        
        // Format Phone (Ensure it has +91 or country code. Defaulting to +91 for India if missing)
        let phoneToSend = formData.phone;
        if (!phoneToSend.startsWith('+')) {
            phoneToSend = '+91' + phoneToSend;
        }

        try {
            // Call Backend API
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneToSend })
            });
            const data = await res.json();

            if (res.ok) {
                setGeneratedOtp(data.otp); // Save the OTP the server generated
                setOtpSent(true);
                
                if (data.isMock) {
                    alert(`[DEV MODE] Twilio keys missing. Your OTP is: ${data.otp}`);
                } else {
                    alert('OTP sent to your phone!');
                }
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            console.error(err);
            setError('Error connecting to OTP service');
        }
    };

    const handleVerifyOtp = async () => {
        // Format Phone
        let phoneToSend = formData.phone;
        if (!phoneToSend.startsWith('+')) {
            phoneToSend = '+91' + phoneToSend;
        }

        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneToSend, otp: otp })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsPhoneVerified(true);
                setError('');
                alert('Phone Verified Successfully!');
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setError('Verification failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isPhoneVerified) {
            setError('Please verify your phone number first');
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
                    phone: formData.phone // Send verified phone
                })
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to create account');
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
                            <span className="text-black font-semibold">Sign Up</span>
                        </div>
                    </div>

                    {/* Signup Form */}
                    <div className="max-w-md mx-auto">
                        <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8 mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                                CREATE ACCOUNT
                            </h1>
                            <p className="text-base text-black">
                                Join Glamora and start shopping!
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
                                    <label className="block text-sm font-semibold text-black mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Phone Verification Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Phone Number</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            disabled={isPhoneVerified}
                                            className={`w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black ${isPhoneVerified ? 'bg-green-50 text-green-800 border border-green-300' : ''}`}
                                            placeholder="1234567890"
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
                                    {otpSent && !isPhoneVerified && (
                                        <div className="mt-2 flex gap-2 animate-fade-in">
                                            <input 
                                                type="text" 
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="Enter OTP"
                                                className="w-full px-4 py-2 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black border border-gray-300"
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
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 bg-white rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !isPhoneVerified}
                                    className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-black">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-bold hover:underline">
                                        Login here
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
