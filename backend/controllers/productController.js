import db from "../config/db.js";
// GET ALL PRODUCTS
export const getProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const updated = results.map((item) => ({
      ...item,
      image: item.image
        ? `${req.protocol}://${req.get("host")}/uploads/${item.image}`
        : null
    }));

    res.json(updated);
  });
};

// ADD NEW PRODUCT
export const addProduct = (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, description, image], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      message: "Product added successfully",
      productId: results.insertId,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${image}`
    });
  });
};

// DELETE PRODUCT
export const deleteProduct = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Product deleted successfully" });
  });
};
