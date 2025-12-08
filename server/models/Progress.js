import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stepId: { type: String, required: true }, // we'll store "1", "2", "3", etc.
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
    },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, stepId: 1 }, { unique: true });

export const Progress = mongoose.model("Progress", progressSchema);
