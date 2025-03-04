import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwörter stimmen nicht überein" });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Benutzer existiert bereits" });

        // Passwort verschlüsseln
        const hashedPassword = await bcrypt.hash(password, 10);

        // Neuen Benutzer speichern
        const User = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Benutzer erfolgreich registriert" });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Registrieren", error });
    }
};

// Login eines Nutzers
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Ungültige Anmeldedaten" });

        // Passwort überprüfen
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Ungültige Anmeldedaten" });

        // JWT-Token erstellen
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Login", error });
    }
};

// Benutzerprofil abrufen (geschützt)
export const getUserProfile = async (req, res) => {

    console.log(req.params.id);
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-password"); // Passwort nicht senden
        if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen des Profils", error });
    }
};

export const deleteUserProfile = async (req, res) => {

    console.log(req.params.id);

    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen des Profils", error });
    }

};

export const getAllUsers = async (req, res) => {

   
  
    try {
        const users = await User.find(); // Passwort nicht senden
        if (!users) return res.status(404).json({ message: "Benutzer nicht gefunden" });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen des Profils", error });
    }
};