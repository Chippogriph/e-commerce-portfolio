import express from "express";
import { login, logout, registerUser } from "../controllers/authController.js";
import { getSession } from "../middleware/session.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", registerUser)
router.get("/session", getSession);

export default router;
