import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const API = "http://localhost:5000/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    try {
      setLoading(true); 
      await axios.delete(`${API}/${id}`);
      await fetchProducts(); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
      setLoading(false); 
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">ID</th> 
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">In Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border text-sm text-gray-500">{p.id}</td>
                <td className="p-2 border font-semibold">{p.name}</td>
                <td className="p-2 border text-sm">{p.description}</td>
                <td className="p-2 border">{p.price} ETB</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-white text-xs ${p.in_stock ? 'bg-green-500' : 'bg-red-500'}`}>
                    {p.in_stock ? 'Yes' : 'No'}
                  </span>
                </td>
                
                <td className="p-2 border space-x-2">
                  <Link 
                    to={`/admin/products/edit/${p.id}`} 
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}