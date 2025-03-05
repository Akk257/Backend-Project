import Product from "../models/productModel.js";  // WICHTIG! 
import { validationResult } from "express-validator";

// Alle Produkte abrufen
export const getProducts = async (req, res) => {
  try {
<<<<<<< HEAD
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
router.get("/:category", getProductById);
router.get("/:price", getProductById);
*/

//  Einzelnes Produkt abrufen
export const getProductByFilter = async (req, res) => {
  const query = {};
  if (req.params.title) {
    query.title = req.params.title;
  }
  if (req.params.category) {
    query.category = req.params.category;
  }
  if (req.params.price) {
    query.price = req.params.price;
  }
  try {
    const product = await Product.findOne(query);
    if (!product)
      return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    // Optional: Wenn ein Query-Parameter "q" angegeben ist, wird gesucht.
    if (req.query.q) {
      const query = req.query.q;
      const products = await Product.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } }
        ]
      });
      return res.json(products);
    }
    const products = await Product.find();
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
>>>>>>> dev
  }
};

// Produkt erstellen
export const createProduct = async (req, res) => {
<<<<<<< HEAD
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
  // Validierungsfehler prüfen
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, price, category, weight } = req.body;

    // Bild wird durch Multer hochgeladen, der Dateiname ist im req.file verfügbar
    const image = req.file ? req.file.filename : null; // Wenn ein Bild hochgeladen wurde, speichern wir den Dateinamen

    // Neues Produkt erstellen
    const newProduct = new Product({ title, description, price, category, weight, image });
    await newProduct.save();
    res.status(201).json(newProduct); // Erfolgreiche Antwort
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen des Produkts", error: error.message });
>>>>>>> dev
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



// Produkt aktualisieren
export const updateProduct = async (req, res) => {
  try {
<<<<<<< HEAD
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Aktualisieren des Produkts", error: error.message });
>>>>>>> dev
  }
};

// Produkt löschen
export const deleteProduct = async (req, res) => {
  try {
<<<<<<< HEAD
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json({ message: "Produkt gelöscht" });
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produkt nicht gefunden" });
    await product.deleteOne();
    res.json({ message: "Produkt erfolgreich gelöscht" });
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
>>>>>>> dev
  }
};
