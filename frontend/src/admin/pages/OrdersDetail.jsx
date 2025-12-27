import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch Orders Error:", err);
      setError("Failed to fetch orders. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Update order status
  const updateStatus = async (id, status) => {
    try {
      // Backend expects: PATCH http://localhost:5000/orders/:id/status
      await axios.patch(`${API}/${id}/status`, { status });
      // Refresh list after update
      fetchOrders();
    } catch (err) {
      console.error("Update Status Error:", err);
      alert("Failed to update status");
    }
  };

  // 3. Delete an order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete order");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
          No orders found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Product</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{o.customer_name}</div>
                    <div className="text-xs text-gray-500">{o.notes}</div>
                  </td>
                  <td className="p-3 text-sm">{o.customer_phone}</td>
                  <td className="p-3 font-semibold text-blue-700">
                    {o.product_name}
                  </td>
                  <td className="p-3 text-sm">
                    {new Date(o.order_date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`text-sm p-1 rounded border ${
                        o.status === 'completed' ? 'bg-green-100' : 
                        o.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteOrder(o.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}