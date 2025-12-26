import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [[{ totalProducts }]] = await db.query("SELECT COUNT(*) as totalProducts FROM products");
    const [[{ totalOrders }]] = await db.query("SELECT COUNT(*) as totalOrders FROM orders");
    const [[{ pendingOrders }]] = await db.query("SELECT COUNT(*) as pendingOrders FROM orders WHERE status = 'pending' OR status = 'Pending'");
    const [[{ totalRevenue }]] = await db.query("SELECT SUM(total_amount) as totalRevenue FROM orders WHERE status = 'paid' OR status = 'Paid'");

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;