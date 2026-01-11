'use client'
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const styles = {
        success: 'bg-green-500 border-green-600',
        error: 'bg-red-500 border-red-600',
        info: 'bg-blue-500 border-blue-600',
        warning: 'bg-yellow-500 border-yellow-600'
    };

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in-right">
            <div className={`${styles[type]} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 min-w-[300px] max-w-[400px] flex items-start gap-3`}>
                <span className="text-2xl font-bold shrink-0">{icons[type]}</span>
                <div className="flex-1">
                    <p className="font-semibold text-sm leading-relaxed">{message}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="shrink-0 text-white hover:text-gray-200 transition-colors ml-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
