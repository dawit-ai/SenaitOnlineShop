// admin/AdminApp.jsx (FIXED)
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import OrdersDetail from "./pages/OrdersDetail"; // Renamed from Orders to avoid conflict
import Customers from "./pages/Customers";
import EditProduct from "./pages/EditProduct";

export default function AdminApp() {
  return (
    <Routes>
      {/* FIX: path is now '/' or an empty string. 
        It inherits the '/admin' prefix from the parent App.jsx route. 
      */}
      <Route path="/" element={<AdminLayout />}> 
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="orders" element={<OrdersDetail />} /> {/* Renamed component */}
        <Route path="customers" element={<Customers />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}