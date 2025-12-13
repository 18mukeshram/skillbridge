📘 SkillBridge – Full Project Documentation

1. Project Overview

SkillBridge is a full-stack web application that helps learners follow a structured and personalized roadmap to become a Frontend, Backend, or Full-Stack developer.

The platform provides:

Clear learning roadmaps

Progress tracking

Step-level detailed explanations

Personal note-taking

Persistent user data across sessions

The project is designed to simulate a real-world learning product, not just a demo application.

2. Motivation & Problem Statement

Many beginners struggle with:

Choosing what to learn next

Following random tutorials without structure

Tracking real progress

Retaining notes and learning context

SkillBridge solves this by providing:

A predefined learning path

Visual progress indicators

Persistent notes tied to each learning step

This project also served as my transition from frontend-only projects to a complete full-stack system.

3. Tech Stack
   Frontend

React (Vite)

Tailwind CSS

React Router

JavaScript (ES6+)

Backend

Node.js

Express.js

REST APIs

JWT Authentication

Database

MongoDB Atlas

Mongoose ODM

Tools & Deployment

Git & GitHub

VS Code

Netlify (Frontend)

Render (Backend)

4. High-Level Architecture
   Browser (React)
   ↓ HTTP Requests
   Express API (Node.js)
   ↓
   MongoDB Atlas

Authentication Flow

JWT tokens issued on login/signup

Tokens stored in localStorage

Token sent via Authorization header

Backend middleware verifies token for protected routes

5. How the Application Works (Step-by-Step)
   Step 1: User Signup / Login

User registers or logs in

Backend validates credentials

JWT token is generated and returned

Frontend stores token and updates auth state

Step 2: Track Selection

User selects a learning track (Frontend / Backend / Full-Stack)

Backend generates roadmap data for that track

Step 3: Roadmap Display

Frontend fetches roadmap via API

Steps are displayed with status indicators

Overall progress percentage is calculated dynamically

Step 4: Step Interaction

Clicking a step opens a detailed page

Detailed explanation + resources are shown

User can update step status

Step 5: Notes

Each step has a personal notes section

Notes are saved to database

Notes persist across sessions

6. API Routes (Backend)
   Auth Routes
   Method Route Description
   POST /api/auth/signup Register new user
   POST /api/auth/login Authenticate user
   Roadmap Routes
   Method Route Description
   GET /api/roadmap/me Get user roadmap
   POST /api/roadmap/step/:id/status Update step status
   Notes Routes
   Method Route Description
   GET /api/notes/:stepId Fetch notes
   POST /api/notes/:stepId Save notes
7. Database Design (Schemas)
   User Schema
   {
   name: String,
   email: String,
   password: String, // hashed
   track: String
   }

Progress Schema
{
userId: ObjectId,
stepId: String,
status: "not-started" | "in-progress" | "completed"
}

Notes Schema
{
userId: ObjectId,
stepId: String,
content: String,
createdAt: Date,
updatedAt: Date
}

8. Example Code Snippets
   JWT Authentication Middleware
   export const protect = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];
   if (!token) return res.status(401).json({ message: "Unauthorized" });

const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
next();
};

Frontend API Call Example
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signupRequest = async (data) => {
const res = await fetch(`${API_BASE}/auth/signup`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data),
});
return res.json();
};

9. State Management & Persistence

Authentication state stored in context

Token persisted in localStorage

On page reload:

App checks token

Restores user session

Fetches roadmap automatically

10. Deployment Strategy
    Frontend (Netlify)

Built using npm run build

Static assets served from dist/

Environment variable: VITE_API_BASE_URL

Backend (Render)

Node service

start script: node index.js

Environment variables:

MONGO_URI

JWT_SECRET

PORT

11. Major Challenges & Learnings
    Real Issues Solved

ES Module vs CommonJS conflicts

Tailwind + Vite configuration issues

MongoDB connection errors

CORS issues between Netlify and Render

Auth persistence on page reload

Debugging network requests in production

What I Learned

How real deployments behave differently from local dev

How frontend and backend failures surface

How to debug systematically instead of guessing

12. Future Improvements

Automated backend tests

Admin panel for roadmap management

Calendar-based learning schedules

AI-powered resource recommendations

13. What This Project Demonstrates

This project demonstrates my ability to:

Build and deploy full-stack applications

Design RESTful APIs

Implement authentication

Work with databases

Debug real-world production issues

Write clear technical documentation
