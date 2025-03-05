import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, getProductByFilter } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts); // Alle Produkte abrufen
router.get("/", getProductByFilter); // Ein Produkt abrufen
router.post("/", createProduct); // Neues Produkt erstellen
router.put("/:id", updateProduct); // Produkt aktualisieren (Preis ändern)
router.delete("/:id", deleteProduct); // Produkt löschen

export default router;
