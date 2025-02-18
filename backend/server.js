import express from "express";
import connectDB from "./libs/db.js";

const app = express();
const PORT = 3000;

connectDB();

app.get("/api/test", (req, res) => {
    res.json({ message: "Server läuft!" });
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
