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

// ✅ CORS: allow both localhost (dev) and your Netlify site
const allowedOrigins = [
  "http://localhost:5173",
  "https://skillbridgeroadmap.netlify.app", // your Netlify URL
  "https://skillbridge-5mz3xnspy-sai-mukesh-rams-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
