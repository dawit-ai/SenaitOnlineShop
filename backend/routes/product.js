import express from "express";
import db from "../config/db.js";
import upload from "../middlewares/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* =========================
   1. GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   2. GET SINGLE PRODUCT
========================= */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   3. CREATE PRODUCT
========================= */
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, description, price, old_price, quantity, in_stock } =
        req.body;

      const images = {
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      };

      // 🔥 Upload each image to Cloudinary
      for (let i = 1; i <= 4; i++) {
        const file = req.files?.[`image${i}`]?.[0];
        if (file) {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            { folder: "senaitshop/products" }
          );
          images[`image${i}`] = result.secure_url;
        }
      }

      await db.query(
        `
        INSERT INTO products
        (name, description, price, old_price, quantity, image1, image2, image3, image4, in_stock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          name,
          description || "",
          parseFloat(price) || 0,
          old_price ? parseFloat(old_price) : null,
          parseInt(quantity) || 0,
          images.image1,
          images.image2,
          images.image3,
          images.image4,
          in_stock == 1 || in_stock === "true" ? 1 : 0,
        ]
      );

      res.status(201).json({ success: true, message: "Product created" });
    } catch (err) {
      console.error("CREATE ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================
   4. UPDATE PRODUCT
========================= */
router.patch(
  "/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, old_price, quantity, in_stock } =
        req.body;

      const images = {
        image1: req.body.image1 || null,
        image2: req.body.image2 || null,
        image3: req.body.image3 || null,
        image4: req.body.image4 || null,
      };

      // Upload only NEW images
      for (let i = 1; i <= 4; i++) {
        const file = req.files?.[`image${i}`]?.[0];
        if (file) {
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            { folder: "senaitshop/products" }
          );
          images[`image${i}`] = result.secure_url;
        }
      }

      await db.query(
        `
        UPDATE products SET
          name=?, description=?, price=?, old_price=?, quantity=?,
          image1=?, image2=?, image3=?, image4=?, in_stock=?
        WHERE id=?
        `,
        [
          name,
          description || "",
          parseFloat(price) || 0,
          old_price ? parseFloat(old_price) : null,
          parseInt(quantity) || 0,
          images.image1,
          images.image2,
          images.image3,
          images.image4,
          in_stock == 1 || in_stock === "true" ? 1 : 0,
          id,
        ]
      );

      res.json({ success: true, message: "Updated successfully" });
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

/* =========================
   5. DELETE PRODUCT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
