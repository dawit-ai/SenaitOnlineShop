import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // 1. Import Toast
import "react-toastify/dist/ReactToastify.css"; // 2. Import CSS

const API = "http://localhost:5000/products";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    old_price: "",
    quantity: "",
    in_stock: true,
  });

  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleFileChange = (e, slot) => {
    if (e.target.files && e.target.files[0]) {
      setImageFiles({ ...imageFiles, [slot]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price) {
      toast.error("Please enter product name and price.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("old_price", product.old_price);
    formData.append("quantity", product.quantity || 0);
    formData.append("in_stock", product.in_stock ? 1 : 0);

    if (imageFiles.image1) formData.append("image1", imageFiles.image1);
    if (imageFiles.image2) formData.append("image2", imageFiles.image2);
    if (imageFiles.image3) formData.append("image3", imageFiles.image3);
    if (imageFiles.image4) formData.append("image4", imageFiles.image4);

    try {
      setLoading(true);
      await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // 3. Trigger Success Toast
      toast.success("🚀 Product added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Wait a moment for the user to see the toast before redirecting
      setTimeout(() => navigate("/admin/products"), 2000);
      
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      {/* 4. Add Toast Container Component */}
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Product Name</label>
          <input type="text" name="name" placeholder="E.g. Coffee Table" onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Description</label>
          <textarea name="description" placeholder="Describe the item..." onChange={handleChange} className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        
        <div className="flex gap-4">
          <div className="w-1/2 space-y-1">
            <label className="text-sm font-semibold text-gray-600">Price (ETB)</label>
            <input type="number" name="price" placeholder="2500" onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" required />
          </div>
          <div className="w-1/2 space-y-1">
            <label className="text-sm font-semibold text-gray-600">Old Price (Optional)</label>
            <input type="number" name="old_price" placeholder="3000" onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Stock Quantity</label>
          <input type="number" name="quantity" placeholder="10" onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex flex-col gap-2 p-2 border rounded bg-gray-50">
              <label className="text-xs font-bold text-gray-500 uppercase">Image Slot {num}</label>
              
              {imageFiles[`image${num}`] && (
                <div className="relative w-full h-24 bg-gray-200 rounded overflow-hidden">
                  <img 
                    src={URL.createObjectURL(imageFiles[`image${num}`])} 
                    alt="preview" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button"
                    onClick={() => setImageFiles({...imageFiles, [`image${num}`]: null})}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl"
                  >
                    ×
                  </button>
                </div>
              )}

              <input 
                type="file" 
                onChange={(e) => handleFileChange(e, `image${num}`)} 
                className="text-[10px] w-full" 
                accept="image/*" 
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 bg-blue-50 p-2 rounded">
          <input type="checkbox" name="in_stock" checked={product.in_stock} onChange={handleChange} className="w-5 h-5 accent-blue-600" />
          <label className="font-semibold text-blue-800">Available in Stock</label>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-3 rounded font-bold text-white transition duration-200 shadow-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "🚀 Uploading to Cloudinary..." : "✅ Save Product"}
        </button>
      </form>
    </div>
  );
}