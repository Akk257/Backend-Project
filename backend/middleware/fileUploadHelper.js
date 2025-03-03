export const validateImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Ungültiges Dateiformat. Nur JPG, PNG und WEBP erlaubt.");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Datei zu groß. Maximal 5MB erlaubt.");
    }
  };
  