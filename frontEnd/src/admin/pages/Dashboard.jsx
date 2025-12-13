import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../components/StatsCard";

// Define the API endpoint for fetching dashboard statistics
const API = "http://localhost:5000/stats"; 

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: '---',
    totalOrders: '---',
    pendingOrders: '---',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(API);
        
        // Update state with actual data from the backend
        setStats({
          totalProducts: res.data.totalProducts,
          totalOrders: res.data.totalOrders,
          pendingOrders: res.data.pendingOrders,
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Dashboard Stats Fetch Error:", err);
        setError("Failed to fetch dashboard statistics.");
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // Display loading or error state
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p>Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-gray-500">Check if your backend is running at {API} and returning the correct data format.</p>
      </div>
    );
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Display the fetched data in the StatsCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Products" value={stats.totalProducts} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard title="Pending Orders" value={stats.pendingOrders} />
      </div>
    </div>
  );
}