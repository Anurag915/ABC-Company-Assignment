

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard"; 
import { useNavigate } from "react-router-dom"; 

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const products = [
  {
    id: 1,
    title: "Advanced AI Research Platform",
    description: "Comprehensive suite for AI model development and deployment.",
    price: 9999,
    image: "https://placehold.co/400x250/3498db/ffffff?text=AI+Platform",
    category: "Software",
  },
  {
    id: 2,
    title: "Secure Data Encryption Module",
    description: "Robust hardware-software solution for data security.",
    price: 4999,
    image: "https://placehold.co/400x250/2ecc71/ffffff?text=Encryption+Module",
    category: "Hardware",
  },
  {
    id: 3,
    title: "Drone Surveillance System Mk-II",
    description: "Next-gen drone with enhanced aerial monitoring capabilities.",
    price: 15000,
    image: "https://placehold.co/400x250/e74c3c/ffffff?text=Drone+System",
    category: "Hardware",
  },
  {
    id: 4,
    title: "Quantum Cryptography Toolkit",
    description:
      "Experimental kit for exploring post-quantum secure communications.",
    price: 7500,
    image: "https://placehold.co/400x250/9b59b6/ffffff?text=Quantum+Kit",
    category: "Research",
  },
  {
    id: 5,
    title: "Bio-Sensor Array for Environmental Monitoring",
    description: "Compact sensor for real-time environmental data collection.",
    price: 3500,
    image: "https://placehold.co/400x250/f39c12/ffffff?text=Bio-Sensor",
    category: "Sensors",
  },
];

const Home = ({ user, cart, setCart }) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        await axios.get(`${apiUrl}/auth/current-user`, {
          withCredentials: true,
        });
       
      } catch (err) {
        console.error("Failed to fetch current user session:", err);
      }
    };
    
    fetchUser(); 
  }, []); 

  const handleBuy = async (productId) => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await axios.post(
        `${apiUrl}/api/payment/create-checkout-session`,
        { productId },
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment failed:", err);
      setErrorMessage("Payment session failed to start. Please try again.");
      setShowErrorModal(true);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
      console.log(`${product.title} added to cart!`);
    } else {
      console.log(`${product.title} is already in the cart.`);
    }
  };

  return (
   
    <div className="bg-gray-50 min-h-screen">
     
      <div className="p-6 pt-10 max-w-7xl mx-auto mt-16 pb-40"> 
        <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
          Discover Our Cutting-Edge Products
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Explore a selection of our innovative solutions, designed to meet the
          demands of modern research and development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuy}
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Payment Error!
            </h3>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
            <button
              onClick={closeErrorModal}
              className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
