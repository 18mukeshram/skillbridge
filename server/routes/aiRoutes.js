import express from "express";
import { askAI } from "../controllers/aiController.js";
import { authRequired } from "../middleware/authMiddleware.js";
const router = express.Router();

// Authenticated AI endpoint
router.post("/ask", authRequired, askAI);

export default router;
