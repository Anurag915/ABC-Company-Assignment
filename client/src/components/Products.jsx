import axios from "axios";

const products = [
  {
    id: 1,
    title: "Tensorgo AI Plan",
    price: 999,
    image: "https://via.placeholder.com/300x200.png?text=Tensorgo+AI+Plan",
  },
  {
    id: 2,
    title: "Monthly Access",
    price: 299,
    image: "https://via.placeholder.com/300x200.png?text=Monthly+Access",
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
      <h1 className="text-3xl font-bold mb-6 text-center">Available Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img src={product.image} className="w-full h-48 object-cover mb-4" />
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
