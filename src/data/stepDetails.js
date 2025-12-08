// Detailed content per roadmap step, keyed by `detailKey`
// used across Frontend / Backend / Full Stack tracks.

export const stepDetails = {
  // ---------- FRONTEND ----------
  frontend_html_css: {
    title: "Weeks 1–2: Solidify HTML & CSS",
    overview:
      "Build a solid foundation in HTML structure and modern CSS so you can create clean, responsive pages.",
    topics: [
      "Semantic HTML: headings, sections, forms, accessibility basics",
      "CSS box model, display, positioning, overflow",
      "Flexbox + basic CSS Grid for layouts",
      "Responsive design with media queries",
    ],
    practiceIdeas: [
      "Clone 2–3 simple landing pages from Dribbble/Behance using HTML/CSS",
      "Build your own portfolio landing page with responsive nav and hero section",
    ],
    resources: [
      {
        label: "MDN – HTML elements reference",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
      },
      {
        label: "MDN – Learn CSS layout",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout",
      },
      {
        label: "freeCodeCamp – Responsive Web Design",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
      },
    ],
    outcome:
      "You can turn a Figma/UI mockup into a responsive HTML/CSS page without relying on templates.",
  },

  frontend_js_es6: {
    title: "Weeks 3–4: Modern JavaScript (ES6+)",
    overview:
      "Learn the JavaScript features you actually use in modern web apps and how to work with APIs.",
    topics: [
      "let/const, arrow functions, template literals, destructuring",
      "Array methods: map, filter, reduce, find",
      "Promises, async/await, fetch API",
      "Error handling and basic debugging in the browser",
    ],
    practiceIdeas: [
      "Build a small app that fetches data from a public API (e.g., Pokémon, movies)",
      "Add interactive behavior to your portfolio (smooth scroll, tabs, filters)",
    ],
    resources: [
      {
        label: "MDN – JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
      {
        label: "JavaScript Info – The Modern JavaScript Tutorial",
        url: "https://javascript.info/",
      },
    ],
    outcome:
      "You can write clean JS, manipulate the DOM, and talk to REST APIs using fetch/async/await.",
  },

  frontend_react: {
    title: "Weeks 5–6: React Fundamentals",
    overview:
      "Understand how React components, props, and state work so you can build real SPAs.",
    topics: [
      "Components, props, and JSX",
      "useState and useEffect hooks",
      "Component composition and lifting state up",
      "React Router basics for multi-page SPAs",
    ],
    practiceIdeas: [
      "Convert a static HTML project into a React SPA",
      "Build a small app with routing (e.g., notes app, recipe finder)",
    ],
    resources: [
      {
        label: "React Docs – Learn React",
        url: "https://react.dev/learn",
      },
      {
        label: "React Router Tutorial",
        url: "https://reactrouter.com/en/main/start/tutorial",
      },
    ],
    outcome:
      "You can build small–medium React apps with routing and shared state.",
  },

  frontend_project_taskmanager: {
    title: "Weeks 7–8: Real Project – Task Manager",
    overview:
      "Apply your frontend skills by building a polished task manager with filtering, persistence, and responsive design.",
    topics: [
      "Planning UI and state structure",
      "Reusable components (buttons, cards, modals)",
      "State for filtering, searching, and sorting tasks",
      "Using localStorage or a backend API to persist tasks",
    ],
    practiceIdeas: [
      "Implement multiple views (Today, Upcoming, Completed)",
      "Add drag-and-drop or keyboard shortcuts for power users",
    ],
    resources: [
      {
        label: "Figma Community – Task app UI ideas",
        url: "https://www.figma.com/community",
      },
    ],
    outcome:
      "You have a portfolio-ready frontend project that showcases real-world UI and state management.",
  },

  // ---------- BACKEND ----------
  backend_js_fundamentals: {
    title: "Weeks 1–2: JS & Node Fundamentals",
    overview:
      "Get comfortable with JavaScript fundamentals in a Node.js environment.",
    topics: [
      "Node.js runtime basics (modules, npm, scripts)",
      "Functions, objects, arrays, and async patterns",
      "Working with the filesystem and environment variables",
    ],
    practiceIdeas: [
      "Build a small CLI script (e.g., note-taker or todo manager)",
      "Write a script that reads/writes JSON files",
    ],
    resources: [
      {
        label: "Node.js – Getting Started",
        url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
      },
      {
        label: "MDN – JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
    ],
    outcome:
      "You can run JS in Node, manage packages, and write small backend scripts.",
  },

  backend_node_express: {
    title: "Weeks 3–4: Node.js & Express APIs",
    overview:
      "Learn how to build REST APIs with Express and structure a backend project.",
    topics: [
      "Express app setup and routing",
      "Middleware pattern (logging, JSON parsing, error handling)",
      "REST API design (resources, status codes)",
      "Using Postman/Thunder Client to test endpoints",
    ],
    practiceIdeas: [
      "Build a CRUD API for tasks or notes",
      "Add pagination and basic validation",
    ],
    resources: [
      {
        label: "Express Guide",
        url: "https://expressjs.com/en/starter/installing.html",
      },
      {
        label: "Postman – API Testing Basics",
        url: "https://learning.postman.com/",
      },
    ],
    outcome:
      "You can design and implement REST APIs that your frontend can consume.",
  },

  backend_mongo: {
    title: "Weeks 5–6: MongoDB & Mongoose",
    overview:
      "Store and query data using MongoDB Atlas and Mongoose in your Node apps.",
    topics: [
      "Connecting to MongoDB Atlas",
      "Schemas, models, and validation",
      "Common queries (find, sort, projections)",
      "Handling errors and connection issues",
    ],
    practiceIdeas: [
      "Extend your CRUD API to persist data in MongoDB",
      "Add basic query filters (e.g., by status or date)",
    ],
    resources: [
      {
        label: "MongoDB University – M001 Basics",
        url: "https://learn.mongodb.com/",
      },
      {
        label: "Mongoose Docs – Getting Started",
        url: "https://mongoosejs.com/docs/",
      },
    ],
    outcome:
      "You can design simple data models and plug MongoDB into your API.",
  },

  backend_project_api: {
    title: "Weeks 7–8: Real Project – Production-ready API",
    overview:
      "Combine everything to build a secure, documented backend API suitable for production.",
    topics: [
      "JWT authentication and protected routes",
      "Environment-based config (dev vs prod)",
      "Error handling patterns and logging",
      "Basic testing or manual test plans",
    ],
    practiceIdeas: [
      "Secure your CRUD API with user accounts and JWT",
      "Write a small README for your API with sample requests",
    ],
    resources: [
      {
        label: "JWT – Introduction",
        url: "https://jwt.io/introduction",
      },
    ],
    outcome:
      "You have a portfolio-worthy backend API with auth, validation, and database integration.",
  },

  // ---------- FULL STACK ----------
  fullstack_web_fundamentals: {
    title: "Weeks 1–2: Web Fundamentals & Git",
    overview:
      "Get comfortable with core web tech (HTML, CSS, JS) and basic Git workflow.",
    topics: [
      "Semantic HTML and responsive CSS",
      "JavaScript basics and DOM manipulation",
      "Using Git locally and pushing to GitHub",
    ],
    practiceIdeas: [
      "Build and deploy a simple landing page",
      "Create your first GitHub repo and commit regularly",
    ],
    resources: [
      {
        label: "MDN – Getting started with the web",
        url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web",
      },
      {
        label: "Git – Getting started",
        url: "https://git-scm.com/docs/gittutorial",
      },
    ],
    outcome:
      "You understand how the web works end-to-end and can version control your work.",
  },

  fullstack_react: {
    title: "Weeks 3–4: React for Frontend",
    overview:
      "Use React to build interactive UIs and connect to APIs you’ll later build yourself.",
    topics: [
      "Component-driven UI, props, and state",
      "Hooks and separation of concerns",
      "Fetching data from APIs with React",
    ],
    practiceIdeas: [
      "Build a small dashboard that consumes a public API",
      "Rebuild one of your static pages in React",
    ],
    resources: [
      {
        label: "React Docs – Learn React",
        url: "https://react.dev/learn",
      },
    ],
    outcome:
      "You can build SPA-style UIs that are ready to plug into your backend.",
  },

  fullstack_node_mongo: {
    title: "Weeks 5–6: Backend with Node.js & MongoDB",
    overview:
      "Build a REST API that powers your React frontend using Node.js, Express, and MongoDB.",
    topics: [
      "Express routing and controllers",
      "Mongoose models and validation",
      "CORS and connecting frontend ↔ backend",
    ],
    practiceIdeas: [
      "Build a full CRUD API for SkillBridge-like data (users, roadmaps, notes)",
      "Connect your React dashboard to your API",
    ],
    resources: [
      {
        label: "Express Docs",
        url: "https://expressjs.com/",
      },
      {
        label: "CORS Explained",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
      },
    ],
    outcome:
      "You can wire a React frontend to a Node/Express/Mongo backend you built.",
  },

  fullstack_project_skillbridge: {
    title: "Weeks 7–8: Full-Stack Project – SkillBridge",
    overview:
      "Turn your learning into a full product: authentication, dashboards, roadmaps, and notes.",
    topics: [
      "JWT-based auth and protected routes",
      "Connecting multiple collections (users, notes, roadmaps)",
      "Basic deployment strategy (e.g., Render/Netlify/Vercel)",
    ],
    practiceIdeas: [
      "Deploy your SkillBridge clone and share it in your portfolio",
      "Add at least one extra feature (tags, search, or progress toggles)",
    ],
    resources: [
      {
        label: "Render Docs – Deploying Node apps",
        url: "https://render.com/docs/deploy-node-express-app",
      },
    ],
    outcome:
      "You have a polished full-stack app that proves you can build and ship real products.",
  },

  // ---------- PLAN SUMMARY ----------
  plan_summary: {
    title: "Your Learning Plan Configuration",
    overview:
      "This step summarizes how your roadmap is generated based on your daily time commitment and chosen track.",
    topics: [
      "How daily hours affect pacing",
      "Which skills are prioritized for your chosen role",
      "How weekly milestones are organized",
    ],
    practiceIdeas: [
      "Block focused study time on your calendar",
      "Review your plan every 2 weeks and adjust hours if needed",
    ],
    resources: [
      {
        label: "Atomic Habits – Consistent Learning Strategies",
        url: "https://jamesclear.com/atomic-habits",
      },
    ],
    outcome:
      "You clearly understand how your personalized roadmap is structured and how to adapt it over time.",
  },
};
