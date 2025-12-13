import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:5000"; // your backend URL

export default function Receipt() {
  const { id } = useParams(); // get orderId from URL
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_BASE}/orders/${id}`);
        setOrder(res.data.order);
        setItems(res.data.items);
      } catch (err) {
        console.error(err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
        // Optional: clear cart after successful payment
        localStorage.removeItem("cart");
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        Payment Successful
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
        <p><strong>Name:</strong> {order.customer_name}</p>
        <p><strong>Phone:</strong> {order.customer_phone}</p>
        <p><strong>Notes:</strong> {order.notes || "-"}</p>
        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{item.product_id}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.price} ETB</td>
                <td className="p-2">{(item.price * item.quantity).toFixed(2)} ETB</td>
              </tr>
            ))}
            <tr className="border-t font-bold">
              <td className="p-2" colSpan="3">Total Amount</td>
              <td className="p-2">{order.total_amount} ETB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-center mt-6 text-gray-600">
        Thank you for your purchase!
      </p>
    </div>
  );
}
