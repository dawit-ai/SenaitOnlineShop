import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(API);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-2 border">{o.customer_name}</td>
                <td className="p-2 border">{o.customer_phone}</td>
                <td className="p-2 border">{o.product?.name_en}</td>
                <td className="p-2 border">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteOrder(o.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
