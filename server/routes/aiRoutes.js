import express from "express";
import { askAI } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Authenticated AI endpoint
router.post("/ask", authMiddleware, askAI);

export default router;
