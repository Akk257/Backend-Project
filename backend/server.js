import express from "express";
import connectDB from "./libs/db.js";
import router from "./routers/productRouters.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api/products", router);

connectDB();

app.get("/api/test", (req, res) => {
    res.json({ message: "Server läuft!" });
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
