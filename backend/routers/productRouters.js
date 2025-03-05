import express from 'express';
import upload from "../middleware/upload.js"; // Importiere die Multer-Middleware
import { createProduct, getProducts, createMultipleProducts, getProductById } from "../controllers/productController.js";
import { productValidator } from "../middleware/productValidator.js"; // Importiere die Validator-Middleware

const router = express.Router();

// GET-Endpunkte
router.get("/", getProducts); // Alle Produkte abrufen
router.get("/:title", getProductById); // Einzelnes Produkt abrufen

// POST-Endpunkt: Produkt erstellen mit Multer (für Bild) und Validierung
router.post("/", upload.single("image"), productValidator, createProduct); // Multer + Validierung für Produkt erstellen

// POST-Endpunkt: Mehrere Produkte gleichzeitig erstellen
router.post("/multiple", createMultipleProducts);

export default router;
