import express from "express";
import { registerUser, loginUser, getUserProfile, deleteUserProfile, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers)

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", getUserProfile);

router.get("/profile/:id", getUserProfile);

router.delete("/profile/:id", deleteUserProfile);



export default router;



// Die Routen für Benutzer registrieren einlogen und bearbeiten