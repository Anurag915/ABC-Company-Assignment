// AdminDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const dummyProducts = [
  {
    id: 1,
    title: "Advanced AI Research Platform",
    category: "Software",
    description: "Comprehensive suite for AI model development and deployment.",
    image: "https://placehold.co/60x40/3498db/ffffff?text=AI",
  },
  {
    id: 2,
    title: "Secure Data Encryption Module",
    category: "Hardware",
    description: "Robust hardware-software solution for data security.",
    image: "https://placehold.co/60x40/2ecc71/ffffff?text=Encrypt",
  },
  {
    id: 3,
    title: "Drone Surveillance System Mk-II",
    category: "Hardware",
    description: "Next-gen drone with enhanced aerial monitoring capabilities.",
    image: "https://placehold.co/60x40/e74c3c/ffffff?text=Drone",
  },
  {
    id: 4,
    title: "Quantum Cryptography Toolkit",
    category: "Research",
    description:
      "Experimental kit for exploring post-quantum secure communications.",
    image: "https://placehold.co/60x40/9b59b6/ffffff?text=Quantum",
  },
  {
    id: 5,
    title: "Bio-Sensor Array for Environmental Monitoring",
    category: "Sensors",
    description: "Compact sensor for real-time environmental data collection.",
    image: "https://placehold.co/60x40/f39c12/ffffff?text=Sensor",
  },
];

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${apiUrl}/api/admin/payments`, {
          withCredentials: true,
        });
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
        setError("Failed to load payment data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return "N/A";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      console.error("Invalid date string:", dateString, e);
      return "Invalid Date";
    }
  };

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const currentPayments = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return payments.slice(indexOfFirstItem, indexOfLastItem);
  }, [payments, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);

      if (currentPage > maxButtons - 2) {
        buttons.push("...");
      }

      let startPage = Math.max(2, currentPage - Math.floor(maxButtons / 2) + 1);
      let endPage = Math.min(
        totalPages - 1,
        currentPage + Math.floor(maxButtons / 2) - 1
      );

      if (currentPage <= Math.floor(maxButtons / 2) + 1) {
        endPage = maxButtons - 1;
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        startPage = totalPages - maxButtons + 2;
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          buttons.push(i);
        }
      }

      if (currentPage < totalPages - Math.floor(maxButtons / 2)) {
        buttons.push("...");
      }

      if (totalPages > 1 && !buttons.includes(totalPages)) {
        buttons.push(totalPages);
      }
    }
    return buttons;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-8 mb-10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Super Admin Dashboard
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-lg text-gray-600">Loading payment data...</p>
          </div>
        ) : error ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xl font-medium text-gray-600 mb-2">
              No Payments Recorded
            </p>
            <p className="text-gray-500">
              There are no payment transactions to display yet.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md mb-6">
              {" "}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">
                      User Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-lg">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPayments.map((p, index) => (
                    <tr
                      key={p._id}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                        {p.productTitle || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {p.productCategory || "N/A"}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate"
                        title={p.productDescription || ""}
                      >
                        {p.productDescription || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {p.productImage ? (
                          <img
                            src={p.productImage}
                            alt={p.productTitle || "Product Image"}
                            className="h-12 w-20 object-cover rounded border border-gray-200"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/60x40/cccccc/333333?text=N/A";
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            p.payment_status === "paid"
                              ? "bg-green-100 text-green-800"
                              : p.payment_status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {p.payment_status
                            ? p.payment_status.charAt(0).toUpperCase() +
                              p.payment_status.slice(1)
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDate(p.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {getPaginationButtons().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNumber === "number" &&
                      handlePageChange(pageNumber)
                    }
                    disabled={typeof pageNumber !== "number"}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Last
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
