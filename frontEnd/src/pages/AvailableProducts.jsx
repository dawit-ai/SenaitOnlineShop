    import { useState, useEffect } from "react";
    import axios from "axios";
    import { useLanguage } from "../hooks/useLanguage";
    import { useNavigate } from "react-router-dom";

    // --- INTERNAL COMPONENT: PriceDisplay ---
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
            <span className={`text-gray-400 line-through ${size} font-normal`}>
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
    // ----------------------------------------

    const API_BASE_URL = "http://localhost:5000";

    export default function AvailableProducts() {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);

    // Build image URLs from backend fields image1..image4 (adjust if your API fields differ)
    const getProductImageUrls = (p) => {
        const imageUrls = [];
        for (let i = 1; i <= 4; i++) {
        if (p[`image${i}`]) {
            // Backend must serve images (e.g., /uploads/...)
            imageUrls.push(`${API_BASE_URL}${p[`image${i}`]}`);
        }
        }
        return imageUrls.length > 0 ? imageUrls : [];
    };

    // Fetch products once
    useEffect(() => {
        axios
        .get(`${API_BASE_URL}/products`)
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => {
            console.error("Failed to load products:", err);
        });
    }, []);

    // Renders images grid depending on count
    const renderImages = (imgs) => {
        if (!imgs || imgs.length === 0)
        return (
            <div className="w-full h-40 bg-gray-600/40 rounded-xl flex items-center justify-center text-gray-300">
            {lang === "am" ? "ምንም ምስል የለም" : "No image"}
            </div>
        );

        if (imgs.length === 1)
        return (
            <img
            src={imgs[0]}
            className="w-full h-40 object-cover rounded-xl"
            alt="Product"
            />
        );

        if (imgs.length === 2)
        return (
            <div className="grid grid-cols-2 gap-2">
            <img
                src={imgs[0]}
                className="h-28 object-cover rounded-xl w-full"
                alt="Product 1"
            />
            <img
                src={imgs[1]}
                className="h-28 object-cover rounded-xl w-full"
                alt="Product 2"
            />
            </div>
        );

        // 3 or more
        return (
        <div className="grid grid-cols-2 gap-2">
            <img
            src={imgs[0]}
            className="h-24 object-cover rounded-xl w-full"
            alt="Product 1"
            />
            <img
            src={imgs[1]}
            className="h-24 object-cover rounded-xl w-full"
            alt="Product 2"
            />
            <div className="col-span-2">
            <img
                src={imgs[2]}
                className="h-28 w-full object-cover rounded-xl"
                alt="Product 3"
            />
            </div>
        </div>
        );
    };

    // Add selected product to cart (localStorage) and go to Orders page
    const handleAddToCart = (prod) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Store minimal necessary data: id, name, price, image
        const item = {
        id: prod.id,
        name: prod.name || prod.name_en || prod.name_am,
        price: prod.price,
        // You can include one image for list view if desired
        image: getProductImageUrls(prod)[0] || "",
        };
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        // Redirect to checkout/orders page
        navigate("/orders");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 tracking-wide">
            {lang === "am" ? "የሚገኙ እቃዎች" : "Available Products"}
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
            <div
                key={p.id}
                onClick={() =>
                setSelected({
                    ...p,
                    images: getProductImageUrls(p),
                })
                }
                className="bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/20 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
                {renderImages(getProductImageUrls(p))}

                <div className="p-2">
                <p className="font-semibold text-yellow-400">
                    {p.name || p.name_en || p.name_am}
                </p>
                <PriceDisplay newPrice={p.price} oldPrice={p.old_price} size="text-lg" />
                </div>
            </div>
            ))}
        </div>

        {/* Modal */}
        {selected && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 rounded-2xl max-w-md w-full p-5 shadow-2xl relative text-gray-100">
                {/* Close Button */}
                <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700 transition"
                >
                ✕
                </button>

                {/* Images */}
                {renderImages(selected.images)}

                <h2 className="text-2xl font-bold mt-4 text-yellow-400">
                {selected.name || selected.name_en || selected.name_am}
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

                {/* Buy button */}
                <div className="mt-5 flex flex-col gap-3">
                <button
                    onClick={() => handleAddToCart(selected)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-2 rounded-xl font-semibold shadow-lg hover:from-green-500 hover:to-green-600 transition"
                >
                    {lang === "am" ? "መግዛት" : "Buy Online"}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }
