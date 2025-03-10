import Product from "../models/productModel.js";  // WICHTIG! 

export const getProducts = async (req, res) => {
  try {
    console.log("🔍 Suchanfrage:", req.query); // ✅ Debugging

    const { query, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // Falls eine Suchanfrage existiert (nach Titel oder Beschreibung)
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }

    // Falls eine Kategorie ausgewählt wurde
    if (category && category !== "Alle Kategorien") {
      filter.category = category;
    }

    // Falls ein Preisbereich angegeben wurde
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Produkte aus der Datenbank abrufen
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



export const searchProducts = async (req, res) => {
  try {
    let { query, category } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Kein Suchbegriff angegeben" });
    }

    // Regex so anpassen, dass Teilwörter gefunden werden
    const regexQuery = `.*${query}.*`;

    let filter = {
      $or: [
        { title: { $regex: regexQuery, $options: "i" } }, // Suche im Titel (Teilübereinstimmung)
        { description: { $regex: regexQuery, $options: "i" } }, // Suche in der Beschreibung
      ],
    };

    if (category && category !== "Alle Kategorien") {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Fehler bei der Produktsuche", error: error.message });
  }
};



