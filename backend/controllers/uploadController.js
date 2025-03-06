import fs from "fs";
import Product from "../models/productModel.js";

// Upload-Funktion für lokale Speicherung mit Multer
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Kein Bild hochgeladen" });
    }

    // Bildpfad speichern
    const imagePath = `/uploads/${req.file.filename}`;
    
    // Produkt aktualisieren (Beispiel)
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt nicht gefunden" });
    }
    product.image = imagePath;
    await product.save();

    res.json({ message: "Upload erfolgreich!", file: imagePath });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Hochladen", error: error.message });
  }
};
