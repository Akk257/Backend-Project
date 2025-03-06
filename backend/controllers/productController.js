import Product from "../models/productModel.js";  // WICHTIG! 
import { validationResult } from "express-validator";

// Alle Produkte abrufen
export const getProducts = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // Suche nach Titel oder Beschreibung
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    // Filter nach Kategorie
    if (category) {
      filter.category = category;
    }

    // Filter nach Preisbereich
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Produkte", error: error.message });
  }
};


// Einzelnes Produkt abrufen
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ title: req.params.title });
    if (!product) return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen des Produkts", error: error.message });
  }
};

// Produkt erstellen
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // Falls ein Bild hochgeladen wurde, speichere den Dateipfad
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({ title, description, price, category, image: imagePath });
    await newProduct.save();

    res.status(201).json({ message: "Produkt erfolgreich erstellt!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen des Produkts", error: error.message });
  }
};



// Produkt erstellen (Mehrere Produkte)
export const createMultipleProducts = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Daten müssen ein Array sein" });
    }
    const products = await Product.insertMany(req.body); // Fügt mehrere Produkte ein
    res.status(201).json(products); // Erfolgreiche Antwort
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen der Produkte", error: error.message });
  }
};



// Produkt bearbeiten
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const updateData = { title, description, price, category };

    // Falls ein neues Bild hochgeladen wurde, aktualisieren
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produkt nicht gefunden!" });
    }

    res.json({ message: "Produkt erfolgreich aktualisiert!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Aktualisieren des Produkts", error: error.message });
  }
};

// Produkt löschen
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produkt nicht gefunden!" });
    }

    res.json({ message: "Produkt erfolgreich gelöscht!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Löschen des Produkts", error: error.message });
  }
};



// Neue Funktion: Produkte suchen (Teilübereinstimmung)
export const searchProducts = async (req, res) => {
  try {
    let query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Kein Suchbegriff angegeben" });
    }

    // Entferne "alle" und "teil" aus der Suche
    query = query.replace(/\balle\b/g, "").replace(/\bteil\b/g, "");

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Suchen der Produkte", error: error.message });
  }
};
