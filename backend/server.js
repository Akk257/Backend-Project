import express from "express";
import connectDB from "./libs/db.js";
import productRoutes from "./routers/productRouters.js";
import userRoutes from "./routers/userRouters.js"; // 🔹 Importiere die User-Routen

const app = express();
const PORT = 3000;

app.use(express.json());

// API-Routen
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); 

connectDB();

app.get("/api/test", (req, res) => {
    res.json({ message: "Server läuft!" });
});

app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
