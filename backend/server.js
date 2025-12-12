// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
dotenv.config(); 


import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Root route check (optional)
app.get("/", (req, res) => {
    res.send("Senait Household Shop Backend API is running!");
});

// Define the API routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});