import Product from "../models/productModel.js";

//  Alle Produkte abrufen
export const getProducts = async (req, res) => {
  try {
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
  }
};

//  Neues Produkt erstellen
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Produkt aktualisieren (z. B. Preis ändern)
export const updateProduct = async (req, res) => {
  try {
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
  }
};

//  Produkt löschen
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Produkt nicht gefunden" });
    res.json({ message: "Produkt gelöscht" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
