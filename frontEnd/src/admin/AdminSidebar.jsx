import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        <NavLink to="/admin" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700"}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700"}>
          Products
        </NavLink>
        <NavLink to="/admin/products/add" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700"}>
          Add Product
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700"}>
          Orders
        </NavLink>
        <NavLink to="/admin/customers" className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded" : "p-2 rounded hover:bg-gray-700"}>
          Customers
        </NavLink>
      </nav>
    </aside>
  );
}