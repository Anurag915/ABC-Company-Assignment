import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful ✅
        </h1>
        <p>Thank you for your purchase!</p>
        <p className="mt-4 text-gray-500">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default Success;
