import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

console.log("MONGO_URI exists?", !!process.env.MONGO_URI);

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://skillbridge-silk.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("SkillBridge API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/notes", noteRoutes);

// connect DB and start
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
