import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { Note } from "../models/Note.js";

const router = express.Router();

// GET /api/notes/:stepId  -> get user's note for this step
router.get("/:stepId", authRequired, async (req, res) => {
  try {
    const { stepId } = req.params;
    const note = await Note.findOne({
      user: req.userId,
      stepId: String(stepId),
    });

    res.json({
      stepId,
      content: note?.content || "",
      updatedAt: note?.updatedAt || null,
    });
  } catch (err) {
    console.error("Get note error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/notes/:stepId  -> create/update note
router.post("/:stepId", authRequired, async (req, res) => {
  try {
    const { stepId } = req.params;
    const { content } = req.body;

    const note = await Note.findOneAndUpdate(
      { user: req.userId, stepId: String(stepId) },
      { content },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      stepId,
      content: note.content,
      updatedAt: note.updatedAt,
    });
  } catch (err) {
    console.error("Save note error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
