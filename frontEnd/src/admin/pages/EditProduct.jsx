import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:5000/products"; 

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    old_price: "",
    in_stock: true,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/${id}`);
        const data = res.data;

        setProduct({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            old_price: data.old_price || "",
            in_stock: data.in_stock === 1, // Convert 1 to true
        });
        
        const images = [];
        for (let i = 1; i <= 4; i++) {
            if (data[`image${i}`]) {
                images.push({ key: `image${i}`, url: data[`image${i}`] });
            }
        }
        setExistingImages(images);

      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setNewImages(files);
  };
  
  const handleDeleteExistingImage = (imageKey) => {
      if (window.confirm(`Are you sure you want to delete ${imageKey}?`)) {
          // NOTE: Your backend must be configured to handle this deletion request.
          // For now, we only remove it from the frontend display.
          setExistingImages(existingImages.filter(img => img.key !== imageKey));
      }
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
    
    // Add new images (Backend must handle which imageX field to replace/add)
    newImages.forEach((image, index) => {
        formData.append(`new_image_${index + 1}`, image);
    });

    try {
      setLoading(true);
      await axios.patch(`${API}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/admin/products"); 
    } catch (err) {
      console.error("Update Error:", err);
      setError("Error updating product.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Product: {product.name}</h1>

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

        {/* Existing Images Display */}
        <div>
          <label className="block font-semibold mb-2">Existing Images</label>
          <div className="flex flex-wrap gap-3">
              {existingImages.length > 0 ? (
                  existingImages.map(img => (
                      <div key={img.key} className="relative w-20 h-20 border rounded overflow-hidden group">
                          {/* NOTE: Adjust the base URL if needed */}
                          <img src={`http://localhost:5000${img.url}`} alt="Product" className="w-full h-full object-cover" />
                          <button 
                              type="button"
                              onClick={() => handleDeleteExistingImage(img.key)}
                              className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                              X
                          </button>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 text-sm">No images found.</p>
              )}
          </div>
        </div>

        {/* New Image Upload */}
        <div>
          <label className="block font-semibold mt-4">Add/Update New Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full rounded"
          />
          <p className="text-sm text-gray-500">Choosing new images may override existing ones (depends on your backend logic).</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}