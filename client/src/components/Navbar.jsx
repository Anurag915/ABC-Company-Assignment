import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-purple-600">
        ABC
      </Link>

      <div className="flex items-center space-x-4">
        {user?.email === "122cs0031@iiitk.ac.in" && (
          <Link to="/admin" className="text-sm text-blue-600 underline">
            Admin Dashboard
          </Link>
        )}

        {user ? (
          <>
            <span className="text-gray-700">👋 {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
