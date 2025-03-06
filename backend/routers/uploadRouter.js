import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Speicherort für hochgeladene Bilder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Upload-Route
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Kein Bild hochgeladen" });
  }
  res.status(200).json({
    message: "Bild erfolgreich hochgeladen!",
    url: `/uploads/${req.file.filename}`,
  });
});

export default router;
