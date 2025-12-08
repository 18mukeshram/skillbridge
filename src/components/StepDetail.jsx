const detailMap = {
  "HTML & CSS": {
    topics: [
      "Semantic HTML (headings, sections, forms)",
      "CSS box model, display, positioning",
      "Flexbox + basic Grid layouts",
      "Responsive design and media queries",
    ],
    outcome:
      "You can build clean, responsive landing pages without relying on templates.",
  },
  "Modern JavaScript": {
    topics: [
      "let/const, arrow functions, template literals",
      "Array methods: map, filter, reduce",
      "Promises, async/await, fetch API",
      "Modules and basic error handling",
    ],
    outcome:
      "You can write clean, modular JS and talk to APIs using fetch/async/await.",
  },
  "React Fundamentals": {
    topics: [
      "Component structure, props, and state",
      "React hooks: useState, useEffect",
      "Component composition and props drilling",
      "Basic routing with React Router",
    ],
    outcome: "You can create SPA-style UIs and manage state across components.",
  },
  "Node.js & Express": {
    topics: [
      "Express routing and middleware",
      "REST API design (GET/POST/PUT/DELETE)",
      "Error handling patterns",
      "Using Postman to test APIs",
    ],
    outcome: "You can build and test REST APIs that your frontend can consume.",
  },
  MongoDB: {
    topics: [
      "Basic CRUD operations",
      "Mongoose schemas & models",
      "Queries and filters",
      "Connecting to MongoDB Atlas",
    ],
    outcome:
      "You can design simple schemas and persist data for your applications.",
  },
};

const guessKeyFromStep = (step) => {
  const title = step.title || "";
  if (title.includes("HTML")) return "HTML & CSS";
  if (title.includes("JavaScript")) return "Modern JavaScript";
  if (title.includes("React")) return "React Fundamentals";
  if (title.includes("Node") || title.includes("Express"))
    return "Node.js & Express";
  if (title.includes("Mongo")) return "MongoDB";
  return null;
};

const StepDetail = ({ step }) => {
  if (!step) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-400">
        Select a roadmap step to see detailed topics, outcomes, and what to
        focus on.
      </div>
    );
  }

  const key = guessKeyFromStep(step);
  const detail = key ? detailMap[key] : null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs space-y-3">
      <div>
        <p className="text-[11px] text-slate-400 mb-1">Step details</p>
        <h2 className="text-sm font-semibold mb-1">{step.title}</h2>
        <p className="text-slate-300">{step.focus}</p>
      </div>

      {detail && (
        <>
          <div>
            <p className="text-[11px] text-slate-400 mb-1">Key topics</p>
            <ul className="list-disc list-inside space-y-1">
              {detail.topics.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 mb-1">
              Goal for this step
            </p>
            <p className="text-slate-300">{detail.outcome}</p>
          </div>
        </>
      )}

      {!detail && (
        <p className="text-slate-400">
          This step is more high level. Use it as a milestone in your learning
          plan.
        </p>
      )}
    </div>
  );
};

export default StepDetail;
