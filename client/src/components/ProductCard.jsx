import React from "react";
const ProductCard = ({ product, onBuy, onAddToCart }) => {
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                 flex flex-col overflow-hidden border border-gray-100"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x250/cccccc/333333?text=Image+Error`;
        }}
      />
      <div className="p-5 flex flex-col flex-grow">
        {product.category && (
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {product.category}
          </span>
        )}
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {product.title}
        </h2>
        {product.description && (
          <p className="text-sm text-gray-600 mb-4 flex-grow">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-extrabold text-gray-800">
              ₹{product.price}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-1/2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => onBuy(product.id)}
              className="w-1/2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
