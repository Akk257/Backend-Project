import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { 
    createProduct, 
    getProducts, 
    createMultipleProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct,
    searchProducts
} from "../controllers/productController.js";

const router = express.Router();

// ✅ KORRIGIERT: Die Suchroute muss vor ":id" stehen!
router.get("/search", searchProducts); // 🔍 Such-Route
router.get("/", getProducts);
router.get("/:id", getProductById);

// ✅ POST & UPDATE Routen bleiben gleich
router.post("/", upload.single("image"), createProduct);
router.post("/multiple", createMultipleProducts);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
