import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import statsRoutes from "./routes/statsRoutes.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

// Load environment variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug (safe for Render)
console.log("--- System Check ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME ? "OK" : "MISSING");
console.log("DB Host:", process.env.DB_HOST ? "OK" : "MISSING");
console.log("--------------------");

// ✅ FIXED CORS (Vercel + Local)
const allowedOrigins = [
  "http://localhost:5173",
  "https://senait-online-shop.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/stats", statsRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Senait Household Shop Backend API running");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
