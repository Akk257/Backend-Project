import express from "express";
import { getUserProfile, deleteUserProfile, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// ✅ Benutzerprofile verwalten
router.get("/:id", getUserProfile);
router.delete("/:id", deleteUserProfile);
router.get("/", getAllUsers);

export default router;
