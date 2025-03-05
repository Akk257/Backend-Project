import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// Multer-Konfiguration für lokale Speicherung
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ordner, in dem die Bilder gespeichert werden
  },
  filename: (req, file, cb) => {
    // Hier wird der Originalname genutzt; alternativ kann eine eigene Namensstrategie implementiert werden
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route zum Hochladen von Bildern; erwartet ein einzelnes Bild im Feld "image"
router.post("/upload", upload.single("image"), uploadImage);

export default router;




/* import express from "express";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Kein Bild hochgeladen" });
    }
    res.json({ message: "Upload erfolgreich", file: req.file.filename });
});

export default router; */
