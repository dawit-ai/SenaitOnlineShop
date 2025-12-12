import express from "express";
import multer from "multer";
import { getProducts, addProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// Image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);

export default router;
