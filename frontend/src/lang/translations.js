import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
