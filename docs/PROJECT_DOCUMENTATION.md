📘 SkillBridge – Full Project Documentation
Project Title

SkillBridge – Personalized Learning Roadmap Platform

1. Project Overview

SkillBridge is a full-stack web application designed to help learners follow a structured and personalized roadmap to become Frontend, Backend, or Full-Stack developers.

The main idea behind SkillBridge is to remove confusion for beginners by providing a clear learning path, progress tracking, and note-taking functionality in one place.

Instead of randomly watching tutorials, users can follow step-by-step roadmaps and track their progress realistically.

2. Why I Built This Project

As a learner myself, I noticed that most beginners struggle not because of lack of resources, but because they don’t know what to learn next and how to measure progress.

I built SkillBridge to:

Practice real-world full-stack development

Understand how frontend and backend communicate

Learn authentication and database persistence

Build something closer to a real product, not just a demo

This project helped me move from tutorial-based learning to real engineering.

3. Tech Stack Used
   Frontend

React (Vite)

Tailwind CSS

JavaScript (ES6+)

React Router

Backend

Node.js

Express.js

REST APIs

JWT Authentication

Database

MongoDB Atlas

Mongoose ODM

Tools & Platforms

Git & GitHub

VS Code

Postman / Thunder Client

Netlify (frontend deployment)

Render (backend deployment)

4. Application Architecture

The application follows a typical client–server architecture.

Flow:

User interacts with the React frontend

Frontend sends requests to Express backend APIs

Backend validates requests and interacts with MongoDB

Backend sends JSON responses back to frontend

Frontend updates UI based on response

Authentication is handled using JWT tokens, which are sent in request headers for protected routes.

5. Key Features Implemented
   Authentication

User signup and login

JWT-based authentication

Protected routes for authenticated users only

Persistent login using localStorage

Personalized Roadmaps

Users choose a learning track (Frontend / Backend / Full Stack)

Each track has a structured roadmap with multiple steps

Roadmaps are dynamically loaded from backend

Progress Tracking

Each roadmap step has a status:

Not Started

In Progress

Completed

Overall progress percentage updates automatically

Progress is stored in the database and persists after refresh

Step Details Page

Clicking on a step opens a detailed page

Each step includes:

Explanation of the topic

Suggested learning resources

Learning goals

Notes System

Users can write personal notes for each roadmap step

Notes are saved in MongoDB

Notes are reloaded whenever the user revisits the step

6. Database Design (High-Level)

Main collections used:

Users

name

email

password (hashed)

selected track

Progress

userId

stepId

status

Notes

userId

stepId

content

timestamps

This structure keeps user data modular and scalable.

7. Challenges Faced & What I Learned

This project involved several real-world challenges:

CORS issues when connecting Netlify frontend with Render backend

Environment variable handling during deployment

MongoDB connection errors due to invalid URI formats

React state issues when handling auth persistence on page reload

Deployment issues related to missing start scripts and root directories

Debugging network requests using browser DevTools and backend logs

Solving these issues gave me strong confidence in debugging and understanding full-stack systems.

8. Deployment Details

Frontend deployed on Netlify

Backend deployed on Render

MongoDB hosted on MongoDB Atlas

Environment variables configured securely on both platforms

The deployed application supports full authentication, roadmap loading, and data persistence.

9. Future Improvements

Add automated tests for backend APIs

Add user profile editing

Add calendar-based learning plans

Improve roadmap customization

Add admin panel to manage roadmaps

10. What This Project Demonstrates

This project demonstrates my ability to:

Build complete full-stack applications

Design REST APIs

Handle authentication securely

Work with databases

Debug real deployment issues

Understand production-like workflows
