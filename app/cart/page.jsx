'use client'
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
    const router = useRouter();
    const { cartItems, cartCount, clearCart, removeFromCart, updateQuantity } = useCart();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [orderProcessing, setOrderProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }
        setLoading(false);
    }, [router]);

    const handleClearCart = () => {
        if (cartItems.length > 0) {
            clearCart();
            showToast('Cart cleared successfully', 'success', 2000);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            const item = cartItems.find(i => i.id === productId);
            removeFromCart(productId);
            showToast(`${item?.name || 'Item'} removed from cart`, 'info', 2000);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = async () => {
        setOrderProcessing(true);
        
        try {
            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('user'));
            
            const orderData = {
                items: cartItems,
                total: calculateTotal() + (calculateTotal() > 200 ? 0 : 50),
                customerName: userData?.name || 'Guest',
                customerPhone: userData?.phone || 'Not provided',
                customerEmail: userData?.email || 'Not provided'
            };

            // Send order to API
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                setOrderSuccess(true);
                setTimeout(() => {
                    clearCart();
                    setShowCheckoutModal(false);
                    setOrderSuccess(false);
                    router.push('/');
                }, 3000);
            } else {
                alert('Order placement failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setOrderProcessing(false);
        }
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
                    <div className="mb-6 text-black">
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-black hover:underline font-medium">Home</Link>
                            <span className="text-black">/</span>
                            <span className="text-black font-semibold">My Cart</span>
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8 md:p-10 mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
                            MY SHOPPING CART
                        </h1>
                        <p className="text-base sm:text-lg text-black">
                            {cartCount > 0 
                                ? `You have ${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`
                                : 'Your cart is empty. Start shopping to add items!'
                            }
                        </p>
                    </div>

                    {/* Cart Content */}
                    {cartCount > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            {/* Left Side - Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8">
                                    <h2 className="text-xl font-bold text-black mb-6">Cart Items</h2>
                                    
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="bg-white rounded-xl p-4 flex gap-4">
                                                {/* Product Image */}
                                                <div className="w-24 h-24 bg-[#f5f5f5] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                                    {item.image ? (
                                                        <Image 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            width={96}
                                                            height={96}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-black mb-1">{item.name || 'Product'}</h3>
                                                    <p className="text-sm text-black mb-2">${item.price || '0.00'}</p>
                                                    
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 bg-[#f5f5f5] text-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-black font-semibold w-8 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 bg-[#f5f5f5] text-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="shrink-0 w-10 h-10 bg-[#f5f5f5] text-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all group"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Clear Cart Button */}
                                    <button
                                        onClick={handleClearCart}
                                        className="mt-6 w-full px-8 py-4 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Clear Cart
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-[#f5f5f5] rounded-2xl shadow-lg p-6 sticky top-4">
                                    <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>
                                    
                                    <div className="space-y-4">
                                        {/* Subtotal */}
                                        <div className="flex justify-between text-black">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                                        </div>

                                        {/* Shipping */}
                                        <div className="flex justify-between text-black">
                                            <span>Shipping</span>
                                            <span className="font-semibold">
                                                {calculateTotal() > 200 ? 'Free' : '$50.00'}
                                            </span>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t-2 border-black my-4"></div>

                                        {/* Total */}
                                        <div className="flex justify-between text-black text-lg font-bold">
                                            <span>Total</span>
                                            <span>${(calculateTotal() + (calculateTotal() > 200 ? 0 : 50)).toFixed(2)}</span>
                                        </div>

                                        {/* Checkout Button */}
                                        <button 
                                            onClick={() => setShowCheckoutModal(true)}
                                            className="w-full mt-6 px-8 py-4 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                        >
                                            Proceed to Checkout
                                        </button>

                                        {/* Continue Shopping */}
                                        <a 
                                            href="/shop"
                                            className="block w-full mt-3 px-8 py-4 bg-white text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                                        >
                                            Continue Shopping
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#f5f5f5] rounded-2xl p-12 text-center">
                            <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-black mb-4">Your cart is empty</h3>
                            <p className="text-black mb-6">Start shopping to add items to your cart!</p>
                            <a 
                                href="/shop"
                                className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                Start Shopping
                            </a>
                        </div>
                    )}
                </div>

                {/* Checkout Confirmation Modal */}
                {showCheckoutModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full">
                            {orderSuccess ? (
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-black mb-2">Order Placed Successfully! 🎉</h3>
                                    <p className="text-black mb-4">WhatsApp notification has been sent!</p>
                                    <p className="text-sm text-gray-600">Redirecting to home page...</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-black mb-4">Confirm Your Order</h3>
                                    
                                    <div className="bg-[#f5f5f5] rounded-xl p-4 mb-6">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-black">Items:</span>
                                                <span className="font-semibold text-black">{cartCount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-black">Subtotal:</span>
                                                <span className="font-semibold text-black">₹{calculateTotal().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-black">Shipping:</span>
                                                <span className="font-semibold text-black">
                                                    {calculateTotal() > 200 ? 'Free' : '₹50.00'}
                                                </span>
                                            </div>
                                            <div className="border-t-2 border-black pt-2 mt-2">
                                                <div className="flex justify-between text-lg">
                                                    <span className="font-bold text-black">Total:</span>
                                                    <span className="font-bold text-black">
                                                        ₹{(calculateTotal() + (calculateTotal() > 200 ? 0 : 50)).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            <div>
                                                <p className="font-semibold text-green-800 mb-1">WhatsApp Notification</p>
                                                <p className="text-sm text-green-700">You will receive order confirmation on WhatsApp</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowCheckoutModal(false)}
                                            disabled={orderProcessing}
                                            className="flex-1 px-6 py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleCheckout}
                                            disabled={orderProcessing}
                                            className="flex-1 px-6 py-3 bg-black text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none"
                                        >
                                            {orderProcessing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                'Place Order'
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
