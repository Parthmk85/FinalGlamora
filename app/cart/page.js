import Navbar from "../components/Home/Navbar";

export default function Cart() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-300 text-black px-5">
            <h1 className="text-4xl font-bold mb-4">My Cart</h1>
            <p className="text-lg text-center max-w-md">
                Your cart is empty. Start shopping to add items here!
            </p>
        </div>
    );
}
