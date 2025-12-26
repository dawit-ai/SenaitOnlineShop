import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/api"; // ✅ Use API helper

// ---------------- PRICE DISPLAY ----------------
function PriceDisplay({ oldPrice, newPrice, size = "text-xl" }) {
  const currentPrice = parseFloat(newPrice);
  const historicPrice = parseFloat(oldPrice);

  const isDiscount = historicPrice && historicPrice > currentPrice;

  const formatPrice = (price) => {
    if (isNaN(price)) return "---";
    return `${price.toFixed(2)} ETB`;
  };

  return (
    <div className="flex items-baseline space-x-2">
      {isDiscount && (
        <span className={`text-gray-400 line-through ${size}`}>
          {formatPrice(historicPrice)}
        </span>
      )}
      <span
        className={`${
          isDiscount ? "text-red-500" : "text-yellow-300"
        } ${size} font-bold`}
      >
        {formatPrice(currentPrice)}
      </span>
    </div>
  );
}
// ------------------------------------------------

export default function AvailableProducts() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  // ✅ FIXED FOR CLOUDINARY
  const getProductImageUrls = (p) => {
    const urls = [];
    for (let i = 1; i <= 4; i++) {
      if (p[`image${i}`]) {
        urls.push(p[`image${i}`]); // ✅ Cloudinary URL
      }
    }
    return urls;
  };

  // Fetch products using central API helper
  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const renderImages = (imgs) => {
    if (!imgs || imgs.length === 0) {
      return (
        <div className="w-full h-40 bg-gray-600/40 rounded-xl flex items-center justify-center text-gray-300">
          {lang === "am" ? "ምንም ምስል የለም" : "No image"}
        </div>
      );
    }

    if (imgs.length === 1) {
      return (
        <img
          src={imgs[0]}
          className="w-full h-40 object-cover rounded-xl"
          alt="Product"
        />
      );
    }

    if (imgs.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <img src={imgs[0]} className="h-28 object-cover rounded-xl w-full" />
          <img src={imgs[1]} className="h-28 object-cover rounded-xl w-full" />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        <img src={imgs[0]} className="h-24 object-cover rounded-xl w-full" />
        <img src={imgs[1]} className="h-24 object-cover rounded-xl w-full" />
        <div className="col-span-2">
          <img src={imgs[2]} className="h-28 w-full object-cover rounded-xl" />
        </div>
      </div>
    );
  };

  const handleAddToCart = (prod) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: getProductImageUrls(prod)[0] || "",
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400">
        {lang === "am" ? "የሚገኙ እቃዎች" : "Available Products"}
      </h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() =>
              setSelected({ ...p, images: getProductImageUrls(p) })
            }
            className="bg-white/10 rounded-2xl p-3 cursor-pointer hover:scale-105 transition"
          >
            {renderImages(getProductImageUrls(p))}

            <div className="p-2">
              <p className="font-semibold text-yellow-400">{p.name}</p>
              <PriceDisplay
                newPrice={p.price}
                oldPrice={p.old_price}
                size="text-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-5 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-gray-800 px-3 py-1 rounded-full"
            >
              ✕
            </button>

            {renderImages(selected.images)}

            <h2 className="text-2xl font-bold mt-4 text-yellow-400">
              {selected.name}
            </h2>

            {selected.description && (
              <p className="mt-2 text-gray-200">{selected.description}</p>
            )}

            <div className="mt-4">
              <PriceDisplay
                newPrice={selected.price}
                oldPrice={selected.old_price}
                size="text-2xl"
              />
            </div>

            <button
              onClick={() => handleAddToCart(selected)}
              className="mt-5 w-full bg-green-600 text-white py-2 rounded-xl font-semibold"
            >
              {lang === "am" ? "መግዛት" : "Buy Online"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
