'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        router.push('/admin/login');
    };

    // Don't show sidebar for login page
    if (pathname === '/admin/login') {
        return <div className="bg-[#f5f5f5] min-h-screen">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 hidden md:block z-20">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-black mb-10">Admin Panel</h1>
                    <nav className="space-y-3">
                        <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
                            <span className="font-semibold">Dashboard</span>
                        </Link>
                        <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/users' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
                            <span className="font-semibold">Manage Users</span>
                        </Link>
                        <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/products' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
                            <span className="font-semibold">Manage Products</span>
                        </Link>
                        <Link href="/admin/add-cart" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/add-cart' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
                            <span className="font-semibold">Add Cart</span>
                        </Link>
                        <Link href="/admin/messages" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/messages' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}>
                            <span className="font-semibold">View Messages</span>
                        </Link>
                        
                        <div className="pt-4 mt-4 border-t border-gray-100">
                             {/* View Shop Removed */}
                            <button 
                                onClick={handleLogout} 
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all text-left"
                            >
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-10">
                {/* Mobile Header */}
                <div className="md:hidden mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black">Admin Panel</h1>
                    <button onClick={handleLogout} className="text-red-600 font-bold">Logout</button>
                </div>
                {children}
            </main>
        </div>
    );
}
