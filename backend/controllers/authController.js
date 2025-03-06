import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Benutzer existiert bereits" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Benutzer erfolgreich registriert", user });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Registrieren", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Ungültige Anmeldedaten" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Ungültige Anmeldedaten" });

    // 🔴 Stelle sicher, dass das Token `isAdmin` enthält!
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    res.json({ message: "Login erfolgreich", user, token });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Login", error: error.message });
  }
};

