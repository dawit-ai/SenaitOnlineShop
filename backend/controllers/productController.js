import db from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    const products = rows.map((p) => ({
      ...p,
      images: p.images ? JSON.parse(p.images) : [],
    }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, old_price, description, quantity } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const images = req.files.map((file) => file.path);
    const in_stock = quantity && Number(quantity) > 0 ? 1 : 0;

    const [result] = await db.query(
      "INSERT INTO products (name, price, old_price, description, images, quantity, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, price, old_price || null, description, JSON.stringify(images), quantity || 0, in_stock]
    );

    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
      images,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};