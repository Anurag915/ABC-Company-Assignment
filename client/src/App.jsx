// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AdminDashboard from "./components/AdminDashboard";
import Cart from "./pages/CartPage";
import Footer from "./components/Footer";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/current-user`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleBuy = async (productId, user) => {
    if (!user) return (window.location.href = "/login");

    try {
      const res = await axios.post(
        `${apiUrl}/api/payment/create-checkout-session`,
        { productId },
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  const handleBuyAll = async (cartItems) => {
    if (!user) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { cartItems },
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Failed to start checkout.");
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      if (!prev.find((item) => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cartCount={cart.length} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
              handleBuy={handleBuy}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              onBuy={(cartItems) => handleBuyAll(cartItems)}
              removeFromCart={removeFromCart}
              user={user}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
