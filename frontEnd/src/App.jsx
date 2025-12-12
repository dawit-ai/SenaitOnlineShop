import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import AvailableProducts from "./pages/AvailableProducts";
import RequestProduct from "./pages/RequestProduct";
import Orders from "./pages/Orders";
import Help from "./pages/Help";
import AdminApp from "./admin/AdminApp";
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen pb-16 bg-light">
          {/* Offline Alert */}
          <div
            id="offlineBox"
            className="hidden fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50"
          >
            እባክዎ ኢንተርኔት ያግኙ
          </div>

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AvailableProducts />} />
            <Route path="/request" element={<RequestProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/help" element={<Help />} />
            <Route path="/admin/*" element={<AdminApp />} />

          </Routes>

          <BottomNav />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

// Offline detection
window.addEventListener("offline", () => {
  document.getElementById("offlineBox").classList.remove("hidden");
});

window.addEventListener("online", () => {
  document.getElementById("offlineBox").classList.add("hidden");
});
