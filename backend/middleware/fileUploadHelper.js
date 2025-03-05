import { validateImage } from "../helpers/fileUploadHelper.js";

export const createProduct = async (req, res) => {
  try {
    // Bildvalidierung
    validateImage(req.file);

    const { title, description, price, category, weight } = req.body;
    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({ title, description, price, category, weight, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen des Produkts", error: error.message });
  }
};
