const ProgressSummary = ({ user }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="text-sm font-semibold mb-3">Learning Overview</h2>
      <p className="text-xs text-slate-300 mb-3">
        Hi <span className="font-semibold">{user.name}</span>, you&apos;re on
        the <span className="font-semibold">{user.targetRole}</span> track
        spending{" "}
        <span className="font-semibold">{user.dailyHours} hrs/day</span>.
      </p>
      <p className="text-xs text-slate-400 mb-1">Overall progress</p>
      <div className="w-full h-2 rounded-full bg-slate-800 mb-2">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${user.progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-300">{user.progress}% completed</p>
    </div>
  );
};

export default ProgressSummary;
