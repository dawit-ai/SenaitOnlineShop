import { useLanguage } from "../hooks/useLanguage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen relative p-4 flex flex-col items-center justify-start
    bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700
    before:absolute before:inset-0 before:bg-[url('/path-to-subtle-texture.png')] before:bg-cover before:opacity-10 before:pointer-events-none
    overflow-hidden">

      
      {/* Banner Card with hover shine */}
      <div className="relative w-full max-w-lg bg-black rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden transform hover:scale-105 transition duration-500">
        
        {/* Animated shine overlay */}
        <div className="absolute top-0 left-[-75%] w-3/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 animate-shine pointer-events-none"></div>

        <h1 className="text-4xl md:text-5xl font-serif text-yellow-400 text-center mb-3 drop-shadow-lg animate-glow">
          {lang === "am" ? "ሰናይት" : "Senait"}
        </h1>
        <p className="text-white text-center text-lg mb-4">
          {lang === "am"
            ? "የቤት እቃዎች | እረጋጋ ጥራት | ቀላል ዋጋ"
            : "Household Items | Reliable Quality | Affordable Price"}
        </p>
        <p className="text-gray-300 text-center text-sm flex items-center justify-center gap-2">
          📞 {"+251 967187794"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md flex flex-col gap-5">
        <button
          onClick={() => navigate("/products")}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-600 transform hover:scale-105 transition duration-300"
        >
          {lang === "am" ? "እቃዎች" : "Products"}
        </button>

        <button
          onClick={() => navigate("/request")}
          className="bg-gradient-to-r from-green-500 to-green-400 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-500 transform hover:scale-105 transition duration-300"
        >
          {lang === "am" ? "መጠየቂያ ምርቶች" : "Request Products"}
        </button>

        <button
          onClick={() => navigate("/help")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-500 transform hover:scale-105 transition duration-300"
        >
          {lang === "am" ? "መርጃ / ቪዲዮ" : "Help / Tutorial"}
        </button>
      </div>

      {/* Optional Footer Note */}
      <div className="mt-8 text-gray-400 text-center text-sm max-w-xs">
        {lang === "am"
          ? "ቀላል እና ፈጣን እቃዎች ይገኙ!"
          : "Find your products easily and quickly!"}
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 6px #facc15, 0 0 12px #fbbf24, 0 0 18px #f59e0b; }
          50% { text-shadow: 0 0 12px #fcd34d, 0 0 18px #fbbf24, 0 0 24px #f59e0b; }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes shine {
          0% { left: -75%; }
          100% { left: 125%; }
        }
        .animate-shine {
          animation: shine 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
}
