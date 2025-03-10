import multer from 'multer';

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Ordner, in dem die Bilder gespeichert werden
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);  // Dateiname wird mit dem aktuellen Zeitstempel versehen
  },
});

// Multer-Middleware mit Dateigrößen- und Dateitypvalidierung
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximale Dateigröße: 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Ungültiges Dateiformat'));
    }
    cb(null, true);
  },
});

export default upload;
