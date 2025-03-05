import express from "express";
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    deleteUserProfile, 
    getAllUsers 
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";  // Middleware importieren

const router = express.Router();

// Alle Benutzer abrufen (nur Admins sollten das können)
router.get("/", authMiddleware, getAllUsers);

// Benutzer registrieren
router.post("/register", registerUser);


// Benutzer einloggen
router.post("/login", loginUser);


// Eigene Profildaten abrufen (geschützt durch Authentifizierung)
router.get("/profile", authMiddleware, getUserProfile);


// Einzelnes Benutzerprofil abrufen (z. B. für Admins)
router.get("/profile/:id", authMiddleware, getUserProfile);


// Benutzer löschen (geschützt durch Authentifizierung)
router.delete("/profile/:id", authMiddleware, deleteUserProfile);

export default router;
