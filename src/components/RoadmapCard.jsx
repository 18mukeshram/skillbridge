import { Link } from "react-router-dom";

const statusStyles = {
  completed: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
  "in-progress": "bg-indigo-500/10 border-indigo-500/40 text-indigo-300",
  "not-started": "bg-slate-800 border-slate-600 text-slate-300",
  info: "bg-slate-900 border-slate-700 text-slate-300",
};

const RoadmapCard = ({ step, onToggleStatus, isActive }) => {
  const baseClasses =
    "rounded-2xl border bg-slate-900/70 p-4 space-y-2 cursor-pointer transition transform hover:-translate-y-0.5";

  const activeRing = isActive ? "ring-2 ring-indigo-500/60" : "";

  const label =
    step.status === "not-started"
      ? "not started"
      : step.status === "in-progress"
      ? "in progress"
      : step.status;

  return (
    <Link
      to={`/roadmap/step/${step.id}`}
      state={{ step, from: "dashboard" }}
      className={`${baseClasses} ${
        statusStyles[step.status] || ""
      } ${activeRing} text-left`}
    >
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-sm font-semibold">{step.title}</h3>

        {step.status !== "info" ? (
          <button
            type="button"
            onClick={(e) => {
              // ✅ don’t navigate when toggling
              e.preventDefault();
              e.stopPropagation();
              onToggleStatus?.(step);
            }}
            className="text-[10px] px-2 py-1 rounded-full bg-slate-950/40 border border-slate-700 hover:border-indigo-400"
          >
            {label}
          </button>
        ) : (
          <span className="text-[10px] px-2 py-1 rounded-full bg-slate-950/40 border border-slate-700">
            info
          </span>
        )}
      </div>

      <p className="text-xs text-slate-300 line-clamp-2">{step.focus}</p>
    </Link>
  );
};

export default RoadmapCard;
