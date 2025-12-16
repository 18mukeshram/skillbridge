import { Link } from "react-router-dom";

const Landing = ({ user }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-indigo-400 uppercase mb-2">
            Learn smarter, not harder
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Your personalized roadmap from{" "}
            <span className="text-indigo-400">beginner</span> to{" "}
            <span className="text-indigo-400">job-ready developer</span>.
          </h1>
          <p className="text-slate-300 text-sm md:text-base mb-6">
            SkillBridge analyzes your current skills, target role, and daily
            time commitment to generate a customized learning plan with projects
            and progress tracking.
          </p>

          {/* 👉 This is the part that changes based on user */}
          <div className="flex flex-wrap gap-3 mb-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium"
                >
                  Go to your dashboard
                </Link>
                <span className="text-xs text-slate-400 self-center">
                  Welcome back,{" "}
                  <span className="font-semibold">{user.name}</span> 👋
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-medium"
                >
                  Get started for free
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-indigo-500 text-sm"
                >
                  Try demo
                </Link>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span>⚡ No ads</span>
            <span>📚 Project-based learning</span>
            <span>📈 Track your growth</span>
          </div>
        </div>

        {/* Right: preview card (static example) */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
          <p className="text-xs text-slate-400 mb-2">Preview example</p>
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs text-slate-400">Roadmap for</p>
                <p className="text-sm font-semibold">Frontend Developer</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                In progress • 42%
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between">
                  <span>HTML & CSS</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 mb-1">
                  <div className="h-full w-full rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>JavaScript Fundamentals</span>
                  <span>70%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 mb-1">
                  <div className="h-full w-3/4 rounded-full bg-indigo-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>React & SPA</span>
                  <span>30%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800">
                  <div className="h-full w-1/3 rounded-full bg-fuchsia-500" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            🎯 Get a clear weekly plan with topics, resources, and projects
            aligned to your goal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
