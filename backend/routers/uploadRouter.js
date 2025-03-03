import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import fileUpload from 'express-fileupload'; // Middleware für Datei-Uploads
import { validateImage } from "../middleware/fileUploadHelper.js";


const router = express.Router();

// Vor dem Upload prüfen
try {
  validateImage(req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({ message: "Upload erfolgreich!", url: result.secure_url });
} catch (error) {
  res.status(400).json({ message: error.message });
}

// Cloudinary-Konfiguration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware für Datei-Uploads aktivieren
router.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Bild-Upload-Route
router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Kein Bild hochgeladen' });
    }

    const image = req.files.image;

    // Bild auf Cloudinary hochladen
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: 'uploads', // Optional: Cloudinary-Ordner
    });

    res.json({ message: 'Upload erfolgreich', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Hochladen', error });
  }
});

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
