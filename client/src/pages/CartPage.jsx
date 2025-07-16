// src/pages/CartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, setCart, onBuy, user }) => {
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleBuyAll = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) return;

    onBuy(cart); 
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          Your cart is empty.
          <button
            onClick={() => navigate("/")}
            className="ml-2 text-blue-600 underline"
          >
            Go back to products
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-6">
            <p className="text-xl font-bold mb-2">Total: ₹{total}</p>
            <button
              onClick={handleBuyAll}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
