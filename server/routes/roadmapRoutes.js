import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { Progress } from "../models/Progress.js";

const router = express.Router();

const buildRoadmap = (user, progressMap = {}) => {
  const role = user.targetRole || "Frontend Developer";
  const hours = user.dailyHours || 2;

  const intensity =
    hours >= 4 ? "fast-track" : hours >= 2 ? "standard" : "slow-paced";

  let steps = [];

  if (role === "Backend Developer") {
    steps = [
      {
        id: 1,
        title: "Weeks 1–2: Programming & JS Fundamentals",
        focus: "Core JavaScript/Node.js syntax, functions, async basics",
        status: "not started",
        detailKey: "backend_js_fundamentals",
      },
      {
        id: 2,
        title: "Weeks 3–4: Node.js & Express",
        focus: "Routing, middleware, REST APIs, error handling",
        status: "not-started",
        detailKey: "backend_node_express",
      },
      {
        id: 3,
        title: "Weeks 5–6: MongoDB & Data Modeling",
        focus: "Mongoose models, queries, relationships, validation",
        status: "not-started",
        detailKey: "backend_mongo",
      },
      {
        id: 4,
        title: "Weeks 7–8: Real Project – API Backend",
        focus: "Auth, JWT, role-based APIs, testing",
        status: "not-started",
        detailKey: "backend_project_api",
      },
    ];
  } else if (role === "Full Stack Developer") {
    steps = [
      {
        id: 1,
        title: "Weeks 1–2: Web Fundamentals",
        focus: "HTML, CSS, basic JS, Git",
        status: "not-started",
        detailKey: "fullstack_web_fundamentals",
      },
      {
        id: 2,
        title: "Weeks 3–4: React Fundamentals",
        focus: "Components, state, hooks, routing",
        status: "not-started",
        detailKey: "fullstack_react",
      },
      {
        id: 3,
        title: "Weeks 5–6: Node.js, Express & MongoDB",
        focus: "REST APIs, models, auth, MongoDB Atlas",
        status: "not-started",
        detailKey: "fullstack_node_mongo",
      },
      {
        id: 4,
        title: "Weeks 7–8: Full-Stack Project – SkillBridge",
        focus: "Deploy full-stack app, env vars, basic CI/CD",
        status: "not-started",
        detailKey: "fullstack_project_skillbridge",
      },
    ];
  } else {
    // Default: Frontend Developer
    steps = [
      {
        id: 1,
        title: "Weeks 1–2: Solidify HTML & CSS",
        focus: "Layouts, Flexbox, responsive design",
        status: "not-started",
        detailKey: "frontend_html_css",
      },
      {
        id: 2,
        title: "Weeks 3–4: Modern JavaScript (ES6+)",
        focus: "Promises, async/await, array methods",
        status: "not-started",
        detailKey: "frontend_js_es6",
      },
      {
        id: 3,
        title: "Weeks 5–6: React Fundamentals",
        focus: "Components, props, state, hooks",
        status: "not-started",
        detailKey: "frontend_react",
      },
      {
        id: 4,
        title: "Weeks 7–8: Real Project – Task Manager",
        focus: "CRUD, localStorage, reusable components",
        status: "not-started",
        detailKey: "frontend_project_taskmanager",
      },
    ];
  }

  steps = steps.map((step) => {
    const key = String(step.id);
    const override = progressMap[key];
    if (override) {
      return { ...step, status: override };
    }
    return step;
  });

  // compute progress based on completed steps
  const totalSteps = steps.length;
  const completed = steps.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / totalSteps) * 100);

  // extra “plan summary” step
  steps.push({
    id: 99,
    title: `Plan mode: ${intensity}`,
    focus: `Daily commitment: ${hours}h/day • Track: ${role}`,
    status: "info",
    detailKey: "plan_summary",
  });

  return { steps, progress };
};

// GET /api/roadmap/me
router.get("/me", authRequired, async (req, res) => {
  try {
    const user = req.user; // from middleware
    const progressDocs = await Progress.find({ user: req.userId });
    const progressMap = {};
    progressDocs.forEach((p) => {
      progressMap[p.stepId] = p.status;
    });

    const { steps, progress } = buildRoadmap(user);

    res.json({
      user: {
        name: user.name,
        targetRole: user.targetRole,
        dailyHours: user.dailyHours,
        level: user.level,
        progress,
      },
      roadmap: steps,
    });
  } catch (err) {
    console.error("Roadmap error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/roadmap/step/:stepId/status
router.post("/step/:stepId/status", authRequired, async (req, res) => {
  try {
    const { stepId } = req.params;
    const { status } = req.body;

    const allowed = ["not-started", "in-progress", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const doc = await Progress.findOneAndUpdate(
      { user: req.userId, stepId: String(stepId) },
      { status },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ stepId: doc.stepId, status: doc.status });
  } catch (err) {
    console.error("Update step status error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
