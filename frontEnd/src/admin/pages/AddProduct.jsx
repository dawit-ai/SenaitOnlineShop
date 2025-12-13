import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/products"; 

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    old_price: "",
    in_stock: true,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      setError("Please enter the product name and price.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("old_price", product.old_price || null);
    formData.append("in_stock", product.in_stock ? 1 : 0); 
    
    // Append images using image1, image2, etc. as keys
    images.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
    });

    try {
      setLoading(true);
      await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/admin/products"); 
    } catch (err) {
      console.error(err);
      setError("Error adding product.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block font-semibold">Product Name *</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Example: Vegetable Basket"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block font-semibold">Price (ETB) *</label>
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
            />
            </div>
            <div>
            <label className="block font-semibold">Old Price (for discount)</label>
            <input
                type="number"
                name="old_price"
                value={product.old_price}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            />
            </div>
        </div>

        <div>
          <label className="block font-semibold">Images (up to 4)</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
          />
        </div>
        
        <div className="flex items-center">
            <input
                type="checkbox"
                name="in_stock"
                checked={product.in_stock}
                onChange={handleChange}
                className="mr-2 h-4 w-4"
            />
            <label className="font-semibold">In Stock?</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}