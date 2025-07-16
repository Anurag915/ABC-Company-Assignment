import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/payments", {
          withCredentials: true,
        });
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Super Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">User Email</th>
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">{p.email}</td>
                <td className="p-2 border">{p.productId || "N/A"}</td>
                <td className="p-2 border">₹{p.amount}</td>
                <td className="p-2 border">{p.payment_status}</td>
                <td className="p-2 border">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
