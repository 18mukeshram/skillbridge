import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    targetRole: { type: String, default: "Frontend Developer" },
    dailyHours: { type: Number, default: 2 },
    level: { type: String, default: "Beginner" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
