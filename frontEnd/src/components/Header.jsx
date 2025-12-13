import { useLanguage } from "../hooks/useLanguage";

export default function Header() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-lg px-4 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Shop name with animated underline */}
      <div className="relative text-xl md:text-2xl font-serif text-yellow-400 drop-shadow-lg">
        {lang === "am" ? "ሰናይት የቤት እቃዎች" : "Senait Household Goods"}

        {/* Animated underline */}
        <span className="absolute left-0 -bottom-1 w-full h-1 bg-yellow-400 rounded-full animate-glow"></span>
      </div>

      {/* Language toggle */}
      <button
        onClick={toggleLanguage}
        className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        {lang === "am" ? "EN" : "አማ"}
      </button>

      {/* Tailwind custom animation */}
      <style>{`
        @keyframes glow {
          0% { transform: scaleX(0); opacity: 0.5; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0.5; }
        }
        .animate-glow {
          transform-origin: left;
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
