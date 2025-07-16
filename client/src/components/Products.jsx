import axios from "axios";

const products = [
  // {
  //   id: 1,
  //   title: "Tensorgo AI Plan",
  //   price: 999,
  //   image: "https://via.placeholder.com/300x200.png?text=Tensorgo+AI+Plan",
  // },
  // {
  //   id: 2,
  //   title: "Monthly Access",
  //   price: 299,
  //   image: "https://via.placeholder.com/300x200.png?text=Monthly+Access",
  // },

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

const Products = () => {
  const handleBuy = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { productId },
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (err) {
      alert("Error starting payment session.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-lg text-gray-700 mb-4">₹{product.price}</p>
            <button
              onClick={() => handleBuy(product.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
