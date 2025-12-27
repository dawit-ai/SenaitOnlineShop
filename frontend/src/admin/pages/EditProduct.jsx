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
    quantity: "",
    in_stock: true,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const [newImages, setNewImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/${id}`).then(res => {
      const data = res.data;
      setProduct({
        ...data,
        in_stock: data.in_stock === 1,
      });
      setLoading(false);
    }).catch(() => {
      setError("Failed to load product");
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append text fields
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("old_price", product.old_price);
    formData.append("quantity", product.quantity);
    formData.append("in_stock", product.in_stock ? 1 : 0);

    // Image logic: send new file if picked, otherwise send old URL string
    for (let i = 1; i <= 4; i++) {
      const fieldName = `image${i}`;
      if (newImages[fieldName]) {
        formData.append(fieldName, newImages[fieldName]);
      } else if (product[fieldName]) {
        formData.append(fieldName, product[fieldName]);
      }
    }

    try {
      await axios.patch(`${API}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/products");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Update failed. Check your connection.");
    }
  };

  if (loading) return <p className="p-10 text-center">Loading Product Details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-10 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
      {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Product Name</label>
            <input name="name" value={product.name} onChange={handleChange} className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} className="border p-2 w-full rounded h-24" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Price (ETB)</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full rounded" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Old Price (Optional)</label>
            <input type="number" name="old_price" value={product.old_price} onChange={handleChange} className="border p-2 w-full rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="in_stock" checked={product.in_stock} onChange={handleChange} className="w-4 h-4" />
          <label className="font-semibold">Available in Stock</label>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-bold mb-4 text-gray-700">Product Images (Up to 4)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="p-3 border rounded bg-gray-50 flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2">Slot {num}</span>
                {product[`image${num}`] && !newImages[`image${num}`] ? (
                  <img src={product[`image${num}`]} className="w-20 h-20 object-cover rounded mb-2 border" alt="current" />
                ) : newImages[`image${num}`] ? (
                  <div className="w-20 h-20 bg-green-100 flex items-center justify-center text-green-600 text-xs text-center rounded mb-2 border">New File Selected</div>
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded mb-2 border flex items-center justify-center text-gray-400 text-xs">Empty</div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="text-xs w-full"
                  onChange={(e) => setNewImages({ ...newImages, [`image${num}`]: e.target.files[0] })} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded font-bold hover:bg-blue-700 transition shadow">Save Changes</button>
          <button type="button" onClick={() => navigate("/admin/products")} className="bg-gray-200 text-gray-700 px-8 py-2 rounded font-bold hover:bg-gray-300 transition">Cancel</button>
        </div>
      </form>
    </div>
  );
}