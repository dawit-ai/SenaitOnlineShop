import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { Home, ShoppingBag, BookOpen, HelpCircle, ClipboardList, Globe } from "lucide-react";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { lang, toggleLanguage } = useLanguage();

  const linkClass = (path) =>
    `flex flex-col items-center text-xs transition-all ${
      pathname === path
        ? "text-yellow-400 scale-110 font-bold"
        : "text-gray-400 hover:text-yellow-300"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 
      bg-gray-900/80 backdrop-blur-xl border-t border-gray-700 
      shadow-xl py-2 px-4 flex justify-around items-center z-50">

      {/* Home */}
      <Link to="/" className={linkClass("/")}>
        <Home size={22} />
        {lang === "am" ? "መነሻ" : "Home"}
      </Link>

      {/* Products */}
      <Link to="/products" className={linkClass("/products")}>
        <ShoppingBag size={22} />
        {lang === "am" ? "እቃዎች" : "Products"}
      </Link>

      {/* Requests */}
      <Link to="/request" className={linkClass("/request")}>
        <ClipboardList size={22} />
        {lang === "am" ? "መጠየቂያ" : "Request"}
      </Link>

      {/* Orders */}
      <Link to="/orders" className={linkClass("/orders")}>
        <BookOpen size={22} />
        {lang === "am" ? "ትእዛዞች" : "Orders"}
      </Link>

      {/* Help */}
      <Link to="/help" className={linkClass("/help")}>
        <HelpCircle size={22} />
        {lang === "am" ? "መርጃ" : "Help"}
      </Link>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="flex flex-col items-center text-xs text-gray-300 hover:text-yellow-400 transition-all"
      >
        <Globe size={22} />
        {lang === "am" ? "EN" : "አማ"}
      </button>
    </div>
  );
}
