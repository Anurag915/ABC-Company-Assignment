import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Navbar = ({ user, setUser, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${apiUrl}/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg p-4 flex justify-between items-center fixed w-full top-0 left-0 z-40">
      <Link to="/" className="text-3xl font-extrabold text-white tracking-wide hover:text-blue-200 transition-colors duration-200">
        ABC
      </Link>

      <div className="flex items-center space-x-4 sm:space-x-6">
        {user?.email === "122cs0031@iiitk.ac.in" && (
          <Link
            to="/admin"
            className="text-white text-sm sm:text-base font-medium px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Admin Dashboard
          </Link>
        )}

        <Link to="/cart" className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200">
          <span className="text-2xl" role="img" aria-label="Shopping Cart">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <span className="text-white text-base font-medium hidden md:inline">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
