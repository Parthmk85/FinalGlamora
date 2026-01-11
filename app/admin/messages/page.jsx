'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminMessages() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact');
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
            return;
        }

        fetchMessages();
        // Polling for real-time updates (every 3 seconds)
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [router]);



    if (loading) return <div className="p-10 text-center font-bold">Loading Messages...</div>;

    return (
        <div className="bg-[#f5f5f5] text-black font-satoshi">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Inquiries & Messages</h1>
                </div>

                <div className="space-y-4">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md border hover:border-black transition-all">
                                <div className="flex flex-col sm:flex-row justify-between mb-2">
                                    <h3 className="font-bold text-lg text-black">{msg.subject}</h3>
                                    <span className="text-sm text-gray-500">
                                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Just now'}
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        {msg.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        {msg.email}
                                    </span>
                                    {msg.phone && (
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            {msg.phone}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg text-gray-800 border-l-4 border-black">
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                            No messages received yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
