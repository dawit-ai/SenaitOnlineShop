import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/customers";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(API);
        setCustomers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} className="border-t">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
