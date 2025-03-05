import fs from 'fs';

// Upload-Funktion für lokale Speicherung mit Multer
export const uploadImage = async (req, res) => {
  try {
    // Mit Multer ist die Datei im req.file
    if (!req.file) {
      return res.status(400).json({ message: 'Kein Bild hochgeladen' });
    }
    
    // Optional: Weitere Validierungen oder Transformationen können hier erfolgen.
    res.json({ message: 'Upload erfolgreich!', file: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Hochladen', error: error.message });
  }
};

