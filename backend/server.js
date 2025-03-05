import express from "express";
import connectDB from "./libs/db.js";
import cors from "cors";
import productRoutes from "./routers/productRouters.js";
import userRoutes from "./routers/userRouters.js"; 
import uploadRouter from "./routers/uploadRouter.js";
import errorHandler from "./middleware/errorMiddleware.js"

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* // Statische Dateien bereitstellen (optional)
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/upload", uploadRouter);



=======



// Fehlerbehandlung
app.use(errorHandler);


connectDB();


//  Server starten
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
