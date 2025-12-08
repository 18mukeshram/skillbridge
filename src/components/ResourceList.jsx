const resources = [
  {
    id: 1,
    title: "MDN – HTML & CSS Guides",
    type: "Docs",
    tag: "Frontend",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
  },
  {
    id: 2,
    title: "MDN – JavaScript Guide",
    type: "Docs",
    tag: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  {
    id: 3,
    title: "React Docs – Main Concepts",
    type: "Docs",
    tag: "React",
    url: "https://react.dev/learn",
  },
  {
    id: 4,
    title: "Node.js + Express Crash Course",
    type: "Video",
    tag: "Backend",
    url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
  },
  {
    id: 5,
    title: "MongoDB University – M001 Basics",
    type: "Course",
    tag: "Database",
    url: "https://learn.mongodb.com/",
  },
  {
    id: 6,
    title: "freeCodeCamp – Responsive Web Design",
    type: "Course",
    tag: "Frontend",
    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
  },
];

const ResourceList = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="text-sm font-semibold mb-3">Suggested resources</h2>
      <ul className="space-y-2 text-xs">
        {resources.map((res) => (
          <li
            key={res.id}
            className="rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2"
          >
            <a
              href={res.url}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center gap-2 hover:text-indigo-300"
            >
              <span className="flex-1">{res.title}</span>
              <span className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300">
                  {res.type}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 hidden sm:inline">
                  {res.tag}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-slate-500 mt-3">
        Click a resource to open it in a new tab.
      </p>
    </div>
  );
};

export default ResourceList;
