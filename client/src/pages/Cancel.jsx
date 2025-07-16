import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled 
        </h1>
        <p>You can try again anytime.</p>
        <p className="mt-4 text-gray-500">Redirecting to home...</p>
      </div>
    </div>
  );
};

export default Cancel;

