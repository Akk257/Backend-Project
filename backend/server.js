import express from "express";
import connectDB from "./libs/db.js";
import cors from "cors";
import productRoutes from "./routers/productRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import uploadRouter from "./routers/uploadRouter.js";
import authRoutes from "./routers/authRoutes.js";  // NEU: Auth-Routen importieren
import errorHandler from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";

// Umgebungsvariablen laden
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API-Routen
app.use("/api/auth", authRoutes);      //  Authentifizierung
app.use("/api/users", userRoutes);     // Benutzerverwaltung
app.use("/api/upload", uploadRouter);  // Datei-Upload
app.use("/api/products", productRoutes); // Produkte

// Fehlerbehandlung
app.use(errorHandler);

// Datenbankverbindung herstellen
connectDB();

// Server starten
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
