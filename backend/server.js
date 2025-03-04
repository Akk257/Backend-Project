import express from "express";
import connectDB from "./libs/db.js";
import cors from "cors";
import productRoutes from "./routers/productRouters.js";
import userRoutes from "./routers/userRouters.js"; 

// import uploadRouter from "./routers/uploadRouter.js";


const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statische Dateien bereitstellen (optional)
app.use("/uploads", express.static("uploads"));


// API-Routen
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/upload", uploadRouter);




connectDB();


// 🚀 Server starten
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
