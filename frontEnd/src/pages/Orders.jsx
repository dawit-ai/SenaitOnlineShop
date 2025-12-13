import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function Orders() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleCheckout = async () => {
    if (!name || !phone) {
      setError("Please enter name and phone number.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/orders`, {
        customer_name: name,
        customer_phone: phone,
        notes,
        products: cart,
        total_amount: total,
      });

      const { payment_url } = res.data;
      localStorage.removeItem("cart"); // clear cart after redirect
      window.location.href = payment_url; // redirect to Chapa
    } catch (err) {
      setError("Failed to process payment");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="w-full bg-white mb-6 shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.price} ETB</td>
              </tr>
            ))}
            <tr className="border-t font-bold">
              <td className="p-2">Total</td>
              <td className="p-2">{total} ETB</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="bg-white p-4 rounded shadow space-y-4">
        <input
          className="p-2 border rounded w-full"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 border rounded w-full"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="p-2 border rounded w-full"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleCheckout}
          disabled={loading || cart.length === 0}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          {loading ? "Processing…" : "Buy Online"}
        </button>
      </div>
    </div>
  );
}
