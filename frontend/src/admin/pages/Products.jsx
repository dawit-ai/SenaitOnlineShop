/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // This was the "unused" variable

  const fetchProducts = async () => {
    try {
      setError(""); // Clear previous errors
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link to="/admin/products/add" className="bg-green-600 text-white px-4 py-2 rounded">+ Add Product</Link>
      </div>

      {/* FIXED: We are now "reading/using" the error variable here */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Image</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Stock</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && !error ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No products found.</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">
                    <img 
                      src={p.image1 || "https://via.placeholder.com/50"} 
                      alt="" 
                      className="w-12 h-12 object-cover rounded" 
                    />
                  </td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.price} ETB</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs text-white ${p.in_stock ? 'bg-green-500' : 'bg-red-500'}`}>
                      {p.in_stock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <Link to={`/admin/products/edit/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}