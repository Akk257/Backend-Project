import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

function tokenCheck(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Kein Token, Zugriff verweigert!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token ist ungültig oder abgelaufen!" });
        }
        
        const user = await User.findOne({ username: payload.username });
        if (!user) {
            return res.status(400).json({ message: "Ungültiges Token, Benutzer nicht gefunden!" });
        }
        req.user = user;
        next();
    });
}

export default tokenCheck;
