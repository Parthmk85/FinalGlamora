'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCart, setSelectedCart] = useState(null);
    const [cartLoading, setCartLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserName, setSelectedUserName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        // Admin Check
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
            return;
        }

        fetchUsers();
    }, [router]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.users) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            // alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleViewCart = async (userId, userName) => {
        setCartLoading(true);
        setSelectedUserName(userName);
        setSelectedUserId(userId);
        setIsModalOpen(true);
        setSelectedCart(null); 
        setStatusMsg({ type: '', text: '' }); 
        setItemToDelete(null);

        try {
            const res = await fetch(`/api/cart?userId=${userId}`);
            const data = await res.json();
            if (res.ok) {
                setSelectedCart(data.items || []);
            } else {
                setSelectedCart([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setSelectedCart([]);
        } finally {
            setCartLoading(false);
        }
    };

    const initiateDelete = (itemId) => {
        setItemToDelete(itemId);
        setStatusMsg({ type: '', text: '' }); // Clear any previous status
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        const itemId = itemToDelete;
        
        // 1. Update UI immediately
        const updatedCart = selectedCart.filter(item => item.id !== itemId);
        setSelectedCart(updatedCart);
        setStatusMsg({ type: 'success', text: 'Item removed from cart.' });
        setItemToDelete(null); // Clear confirm prompt

        // 2. Update Database
        try {
            await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: selectedUserId, items: updatedCart })
            });
            // Keep success message for a bit
            setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error("Failed to remove item:", error);
            setStatusMsg({ type: 'error', text: 'Error removing item from DB.' });
        }
    };

    const cancelDelete = () => {
        setItemToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCart(null);
        setSelectedUserId(null);
        setStatusMsg({ type: '', text: '' });
        setItemToDelete(null);
    };

    if (loading) return <div className="p-10 text-center">Loading Users...</div>;

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-6 sm:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">User Management</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/dashboard" className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300">
                            Back to Dashboard
                        </Link>
                        <button 
                            onClick={() => {
                                localStorage.removeItem('isAdmin');
                                router.push('/admin/login');
                            }} 
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="p-4 border-b">Name</th>
                                    <th className="p-4 border-b">Email</th>
                                    <th className="p-4 border-b">Password (Hash)</th>
                                    <th className="p-4 border-b">Phone</th>
                                    <th className="p-4 border-b">Cart Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="p-4 border-b font-medium text-black">{user.name}</td>
                                            <td className="p-4 border-b text-gray-700">{user.email}</td>
                                            <td className="p-4 border-b text-xs text-gray-500 font-mono break-all max-w-xs">
                                                {user.password ? user.password.substring(0, 20) + '...' : 'N/A'}
                                            </td>
                                            <td className="p-4 border-b text-gray-700">{user.phone}</td>
                                            <td className="p-4 border-b">
                                                <button 
                                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                                    onClick={() => handleViewCart(user.id, user.name)}
                                                >
                                                    View Cart
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 text-sm text-gray-500 bg-gray-50 border-t">
                        Total Users: {users.length}
                    </div>
                </div>
            </div>

            {/* View Cart Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-black">{selectedUserName}'s Cart</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full text-black">
                                ✕
                            </button>
                        </div>

                        {/* Confirmation or Status Message Area */}
                        {itemToDelete ? (
                            <div className="mb-4 p-4 rounded-lg bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 flex flex-col sm:flex-row justify-between items-center gap-3 shadow-sm animate-pulse">
                                <span className="font-bold flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Are you sure you want to remove this item?
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={confirmDelete} className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold shadow-sm transition-transform active:scale-95">
                                        Yes, Remove
                                    </button>
                                    <button onClick={cancelDelete} className="px-4 py-1.5 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold shadow-sm transition-transform active:scale-95">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : statusMsg.text && (
                            <div className={`mb-4 p-3 rounded-lg text-white font-semibold text-center shadow-sm ${statusMsg.type === 'error' ? 'bg-red-500' : 'bg-green-600'}`}>
                                {statusMsg.text}
                            </div>
                        )}

                        {cartLoading ? (
                            <div className="text-center py-10">Loading Cart...</div>
                        ) : selectedCart && selectedCart.length > 0 ? (
                            <div className="space-y-4">
                                {selectedCart.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-gray-50 relative group">
                                        
                                        {/* Delete Button */}
                                        <button 
                                            onClick={() => initiateDelete(item.id)}
                                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                            title="Remove Item"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>

                                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 pr-6">
                                            <h3 className="font-bold text-black">{item.name}</h3>
                                            <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                            <p className="text-sm font-semibold mt-1 text-black">Quantity: {item.quantity}</p>
                                            <p className="text-sm font-bold text-black mt-1">Total: ${item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-4 border-t flex justify-between font-bold text-lg text-black">
                                    <span>Grand Total:</span>
                                    <span>${selectedCart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                Cart is Empty
                            </div>
                        )}

                        <div className="mt-6 text-right">
                            <button onClick={closeModal} className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
