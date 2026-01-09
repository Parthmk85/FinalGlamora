'use client'
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cartCount, clearCart } = useCart();

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-300 text-black px-5">
            <h1 className="text-4xl font-bold mb-4">My Cart</h1>
            
            {cartCount > 0 ? (
                <div className="flex flex-col items-center gap-6">
                    <p className="text-lg text-center max-w-md">
                        You have {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart.
                    </p>
                    
                    {/* Styled Clear Cart Button */}
                    <button
                        onClick={handleClearCart}
                        className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden"
                    >
                        {/* Animated background effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        
                        {/* Button text */}
                        <span className="relative flex items-center gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear Cart
                        </span>
                    </button>
                </div>
            ) : (
                <p className="text-lg text-center max-w-md">
                    Your cart is empty. Start shopping to add items here!
                </p>
            )}
        </div>
    );
}
