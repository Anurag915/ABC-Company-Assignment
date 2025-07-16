import React from 'react';

// This component displays a single product card with enhanced UI.
const ProductCard = ({ product, onBuy }) => {
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
          e.target.onerror = null; // Prevent infinite loop on error
          e.target.src = `https://placehold.co/400x250/cccccc/333333?text=Image+Error`; // Fallback image
        }}
      />
      <div className="p-5 flex flex-col flex-grow">
        {product.category && ( // Conditionally render category if it exists
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {product.category}
          </span>
        )}
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {product.title}
        </h2>
        {product.description && ( // Conditionally render description if it exists
          <p className="text-sm text-gray-600 mb-4 flex-grow">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-2xl font-extrabold text-gray-800">
            ₹{product.price}
          </p>
          <button
            onClick={() => onBuy(product.id)}
            className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg
                       hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                       transition-colors duration-200 shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
