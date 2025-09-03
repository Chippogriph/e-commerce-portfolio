import express from "express";
import { login, logout, getSession, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", registerUser)
router.get("/session", getSession);

export default router;
