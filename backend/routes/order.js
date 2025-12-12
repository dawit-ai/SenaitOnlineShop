// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db"); // your MySQL connection

const CHAPA_SECRET_KEY = "YOUR_CHAPA_SECRET_KEY"; // replace with your key
const BASE_URL = "http://localhost:5173"; // frontend URL for redirect after payment

// Create new order + get Chapa payment link
router.post("/", async (req, res) => {
  try {
    const { customer_name, customer_phone, notes, products, total_amount } = req.body;

    // 1️⃣ Save order in MySQL
    const [orderResult] = await db.query(
      "INSERT INTO orders (customer_name, customer_phone, notes, order_date, status, total_amount) VALUES (?, ?, ?, NOW(), 'pending', ?)",
      [customer_name, customer_phone, notes, total_amount]
    );
    const orderId = orderResult.insertId;

    // Optional: save order items into order_items table
    for (const p of products) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, product_name, price) VALUES (?, ?, ?, ?)",
        [orderId, p.id, p.name, p.price]
      );
    }
    // GET /orders/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [orderRows] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
    if (orderRows.length === 0) return res.status(404).json({ error: "Order not found" });

    const order = orderRows[0];

    const [itemsRows] = await db.execute("SELECT * FROM order_items WHERE order_id = ?", [id]);

    res.json({ order, items: itemsRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});


    // 2️⃣ Call Chapa API to create payment
    const chapaRes = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: total_amount,
        currency: "ETB",
        email: "customer@example.com", // optional
        first_name: customer_name,
        last_name: "",
        tx_ref: `order-${orderId}-${Date.now()}`,
        callback_url: `${BASE_URL}/api/chapa/callback/${orderId}`, // Chapa will call this after payment
      },
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const payment_url = chapaRes.data.data.checkout_url;

    res.json({ success: true, payment_url, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// 3️⃣ Callback route (Chapa will call this)
router.post("/chapa/callback/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { tx_ref, status } = req.body;

  try {
    // Verify payment with Chapa
    const verifyRes = await axios.get(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      },
    });

    if (verifyRes.data.data.status === "success") {
      // Update order status
      await db.query("UPDATE orders SET status='paid' WHERE id=?", [orderId]);
    } else {
      await db.query("UPDATE orders SET status='failed' WHERE id=?", [orderId]);
    }

    // Redirect to frontend receipt page
    res.redirect(`${BASE_URL}/receipt/${orderId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Chapa callback error");
  }
});

module.exports = router;
