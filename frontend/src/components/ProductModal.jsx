import { useState } from "react";

export default function ProductModal({ product, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleChapaPayment = async () => {
    setLoading(true);

    // Example payload for Chapa (replace with your backend endpoint)
    const payload = {
      amount: product.price,
      currency: "ETB",
      email: "customer@example.com", // You can get from form later
      first_name: "Customer",
      last_name: "",
      tx_ref: `senait-${Date.now()}`,
      callback_url: "https://yourwebsite.com/payment-callback",
      phone_number: "+251967187794",
    };

    try {
      // Call your backend API to create Chapa payment session
      const response = await fetch("/api/chapa/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.checkout_url) {
        // Redirect user to Chapa payment page
        window.location.href = data.checkout_url;
      } else {
        alert("Payment initialization failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-4 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 font-bold text-xl"
        >
          ✕
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded mb-3"
        />
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-gray-800 font-semibold mb-2">{product.price} ብር</p>

        <button
          onClick={handleChapaPayment}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "በሂሳብ ላይ..." : "አሁን ግዢ (Chapa)"}
        </button>
      </div>
    </div>
  );
}
