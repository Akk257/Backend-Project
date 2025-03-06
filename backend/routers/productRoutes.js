import express from "express";
import upload from "../middleware/upload.js"; // Multer für Bild-Upload
import authMiddleware from "../middleware/authMiddleware.js"; // Auth-Middleware für Login-Schutz
import adminMiddleware from "../middleware/adminMiddleware.js"; // 👈 Nur Admins dürfen löschen
import { createProduct, getProducts, createMultipleProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { productValidator } from "../middleware/productValidator.js"; // Produkt-Validierung

const router = express.Router();

// GET-Endpunkte
router.get("/", getProducts); // Alle Produkte abrufen
router.get("/:id", getProductById); // Einzelnes Produkt abrufen (jetzt mit `id` statt `title`)

// POST-Endpunkt: 🔒 Nur eingeloggte Nutzer dürfen Anzeigen erstellen
router.post("/", authMiddleware, upload.single("image"), productValidator, createProduct);

// POST-Endpunkt: Mehrere Produkte erstellen (optional ohne Bild-Upload)
router.post("/multiple", authMiddleware, createMultipleProducts);

//  **PUT-Endpunkt: Produkt bearbeiten**
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);

//  **DELETE-Endpunkt: 🔒 Nur Admins dürfen Anzeigen löschen**
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
