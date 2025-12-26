import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* =========================
   CUSTOMER: CREATE ORDER
   (PAYMENT DISABLED FOR NOW)
========================= */
router.post("/", async (req, res) => {
  try {
    const {
      customer_name,
      customer_phone,
      notes,
      products,
      total_amount,
    } = req.body;

    // 1️⃣ Create order
    const [orderResult] = await db.query(
      `
      INSERT INTO orders
      (customer_name, customer_phone, notes, order_date, status, total_amount)
      VALUES (?, ?, ?, NOW(), 'pending', ?)
      `,
      [customer_name, customer_phone, notes || "", total_amount]
    );

    const orderId = orderResult.insertId;

    // 2️⃣ Insert order items
    for (const p of products) {
      await db.query(
        `
        INSERT INTO order_items
        (order_id, product_id, product_name, price)
        VALUES (?, ?, ?, ?)
        `,
        [orderId, p.id, p.name, p.price]
      );
    }

    // ✅ Chapa is DISABLED (safe)
    res.json({
      success: true,
      message: "Order created successfully (payment disabled)",
      orderId,
    });

  } catch (err) {
    console.error("ORDER ERROR:", err.message);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* =========================
   ADMIN: GET ALL ORDERS
========================= */
router.get("/", async (req, res) => {
  try {
    const [orders] = await db.query(
      "SELECT * FROM orders ORDER BY order_date DESC"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ADMIN: UPDATE STATUS
========================= */
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, req.params.id]
    );
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   ADMIN: DELETE ORDER
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM orders WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
