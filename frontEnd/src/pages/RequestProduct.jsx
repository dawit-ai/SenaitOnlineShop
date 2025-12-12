import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function RequestProduct() {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    const apiData = [
      {
        id: 1,
        name_am: "የተለየ እቃ 1",
        name_en: "Special Product 1",
        description_am: "ይህ እቃ ከፍተኛ ጥራት አለው እና በቅርብ ጊዜ ተዘጋጅቷል።",
        description_en: "High-quality product with premium finish, available now.",
        priceRange: "3,500 - 5,200 ETB",
        images: [
          "https://images.unsplash.com/photo-1616627984975-85b1f27e99e7?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=500&q=60",
        ],
      },
      {
        id: 2,
        name_am: "የተለየ እቃ 2",
        name_en: "Special Product 2",
        description_am: "ተለዋዋጭ እና አስደናቂ እቃ።",
        description_en: "Elegant and versatile product suitable for various uses.",
        priceRange: "6,800 - 8,500 ETB",
        images: [
          "https://images.unsplash.com/photo-1580910051078-f9b9d5f77a9f?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1592879628889-6a03729ecac0?auto=format&fit=crop&w=500&q=60",
        ],
      },
      {
        id: 3,
        name_am: "የተለየ እቃ 3",
        name_en: "Special Product 3",
        description_am: "ይህ እቃ ከፍተኛ ጥራት እና ተለዋዋጭ ነው።",
        description_en: "Premium and luxurious product with multiple images to showcase.",
        priceRange: "10,000 - 13,500 ETB",
        images: [
          "https://images.unsplash.com/photo-1562184647-7f63b6b44d47?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1530845644445-ec0b8e798e8e?auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60",
        ],
      },
    ];
    setProducts(apiData);
  }, []);

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || selectedProducts.length === 0) {
      alert(lang === "am" ? "እባክዎ ሁሉንም ይሙሉ!" : "Please fill all fields!");
      return;
    }
    const requestData = { name, phone, notes, selectedProducts, date: new Date().toISOString() };
    console.log("Request Sent:", requestData);
    alert(lang === "am" ? "ትዕዛዝዎ ተላከ!" : "Your request has been sent!");
    setSelectedProducts([]);
    setName(""); setPhone(""); setNotes("");
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400">
        {lang === "am" ? "የሚገኙ ምርቶች" : "Available Products"}
      </h1>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setModalProduct(product)}
            className="bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer 
              hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-600"
          >
            <img
              src={product.images[0]}
              alt={product.name_en}
              className="w-full h-60 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-yellow-300">
                {lang === "am" ? product.name_am : product.name_en}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
      >
        <input
          type="text"
          placeholder={lang === "am" ? "ስም" : "Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-gray-100"
        />
        <input
          type="text"
          placeholder={lang === "am" ? "ስልክ ቁጥር" : "Phone Number"}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-gray-100"
        />
        <textarea
          placeholder={lang === "am" ? "ተጨማሪ ማስታወሻ" : "Additional Notes"}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border border-gray-600 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-gray-100"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900 py-3 rounded-2xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition"
        >
          {lang === "am" ? "ጠይቅ" : "Submit Request"}
        </button>
      </form>

      {/* Modal */}
      {modalProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalProduct(null)}
        >
          <div
            className="bg-gray-900 bg-opacity-90 rounded-2xl max-w-3xl w-full p-6 relative text-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl"
              onClick={() => setModalProduct(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">
              {lang === "am" ? modalProduct.name_am : modalProduct.name_en}
            </h2>
            <p className="mb-4 text-gray-300">
              {lang === "am" ? modalProduct.description_am : modalProduct.description_en}
            </p>
            <p className="text-yellow-300 font-semibold mb-4">{modalProduct.priceRange}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {modalProduct.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Product"
                  className="w-full h-32 object-cover rounded-xl"
                />
              ))}
            </div>
            <button
              className={`mt-6 w-full py-3 rounded-2xl font-semibold text-gray-900 
                ${selectedProducts.includes(modalProduct.id)
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-yellow-500 hover:bg-yellow-400"
                }`}
              onClick={() => toggleProduct(modalProduct.id)}
            >
              {selectedProducts.includes(modalProduct.id)
                ? lang === "am" ? "ምርት ተሰርዟል" : "Selected"
                : lang === "am" ? "ምርት ይምረጡ" : "Select Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
