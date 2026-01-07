'use client'
import React, { useState } from "react";
import { useCart } from "./CartContext";

const ProductInfo = () => {
  const productData = {
    title: "NADETTA COAT BEIGE",
    rating: 4.8,
    reviews: 328,
    price: 350,
    oldPrice: 600,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "light", value: "#D9D9D9" },
      { name: "black", value: "#000000" }
    ],
  };

  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("light");
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  const { addToCart } = useCart();

  return (
    <div className="w-full text-black flex justify-center px-4 sm:px-10 py-6 font-satoshi">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between gap-8">

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col gap-3">

          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-center md:text-left md:pr-12">
            {productData.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-black justify-center md:justify-start">
            <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
            <span>({productData.rating} from {productData.reviews} Reviews)</span>
          </div>

          {/* Color */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-medium text-gray-600 mb-1">Select Color</p>
            <div className="flex gap-2">
              {productData.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-6 h-6 rounded-full transition ${selectedColor === c.name ? "border-2 border-black scale-110" : "border border-gray-300"
                    }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-medium text-black mb-2">Select Size</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {productData.sizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1 border rounded-full text-xs sm:text-sm transition whitespace-nowrap ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full  md:w-1/2 flex flex-col items-center md:items-end gap-3">

          {/* Labels */}
          <div className="w-full text-black flex justify-between md:justify-end gap-16 text-xs sm:text-sm font-medium">
            <span>Total Price</span>
            <span>Quantity</span>
          </div>

          {/* Price + Qty */}
          <div className="w-full flex justify-between items-center md:justify-end md:gap-12">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-black">${productData.price}</span>
              <span className="text-xl line-through text-gray-500">${productData.oldPrice}</span>
            </div>

            {/* Counter */}
            <div className="flex items-center gap-3">
              <button onClick={decreaseQty} className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white">−</button>
              <span className="text-xl  font-semibold">{quantity}</span>
              <button onClick={increaseQty} className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white">+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center md:justify-end">
            <button
              onClick={() => addToCart(quantity)}
              className="px-6 py-2 border-2 border-black rounded-full text-xs sm:text-sm font-semibold hover:bg-black hover:text-white whitespace-nowrap"
            >
              ADD TO CART
            </button>
            <button className="px-6 py-2 bg-black text-white rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
              BUY IT NOW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
