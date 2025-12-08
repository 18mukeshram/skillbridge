import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-xs md:text-sm px-2 py-1 rounded-lg transition ${
        isActive
          ? "text-slate-50 bg-slate-800"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = ({ user, onLogout }) => {
  const isAuthed = !!user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "SB";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-2xl bg-indigo-500 flex items-center justify-center text-xs font-bold shadow-lg shadow-indigo-500/40">
            SB
          </div>
          <span className="font-semibold text-sm md:text-base">
            SkillBridge
          </span>
        </Link>

        {/* Center: nav links */}
        <div className="hidden sm:flex items-center gap-2">
          <NavLink to="/">Home</NavLink>
          {isAuthed && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>

        {/* Right: auth controls */}
        <div className="flex items-center gap-2">
          {!isAuthed ? (
            <>
              <Link
                to="/login"
                className="text-xs md:text-sm px-3 py-1.5 rounded-xl border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-indigo-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-xs md:text-sm px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-slate-50 font-medium"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="hidden md:flex flex-col items-end mr-1">
                <span className="text-[11px] text-slate-400">
                  Hi, <span className="font-semibold">{user.name}</span>
                </span>
                {user.targetRole && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400 mt-0.5">
                    {user.targetRole}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[11px] font-semibold text-slate-100">
                  {initials}
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-[11px] md:text-xs px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-200"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
