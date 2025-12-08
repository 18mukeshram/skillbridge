import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stepId: { type: String, required: true }, // we’ll use the step id from URL
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

noteSchema.index({ user: 1, stepId: 1 }, { unique: true });

export const Note = mongoose.model("Note", noteSchema);

export const getNoteRequest = async (userId, stepId) => {
  const note = await Note.findOne({ user: userId, stepId });
  return note;
};
