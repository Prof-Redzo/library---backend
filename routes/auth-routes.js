import express from "express";
import { registerUser, login } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", login);

export default router;