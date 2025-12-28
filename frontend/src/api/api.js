import axios from "axios";

// 1. Get the URL from Env or fallback to Render
const API_URL = import.meta.env.VITE_API_URL || "https://senait-backend.onrender.com";

// Debug to verify in browser console
console.log("🚀 Current API Target:", API_URL);

// 2. Create ONE axios instance
const api = axios.create({
  baseURL: API_URL,

});

// ============================
// API FUNCTIONS
// ============================

export const getAllProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("GET ALL PRODUCTS ERROR:", err);
    throw err;
  }
};

export const getProduct = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    throw err;
  }
};

export const createProduct = async (formData) => {
  try {
    const res = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    throw err;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const res = await api.patch(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    throw err;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    throw err;
  }
};