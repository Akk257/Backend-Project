import express from "express";
import { registerUser, loginUser, getUserProfile, deleteUserProfile, getAllUsers } from "../controllers/userController.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const app = express();

app.use(express.json());

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 Minuten
    max: 5,
    message: "Zu viele Anfragen, bitte versuchen Sie es in 15 Minuten erneut"
});

router.get("/", getAllUsers)

router.post("/register", registerUser);



router.post("/login", loginLimiter, loginUser);

router.get("/profile", getUserProfile);

router.get("/profile/:id", getUserProfile);

router.delete("/profile/:id", deleteUserProfile);



export default router;



// Die Routen für Benutzer registrieren einlogen und bearbeiten