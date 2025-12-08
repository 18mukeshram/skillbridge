import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRequest } from "../services/api";

const Signup = ({ onAuthSuccess, isAuthed }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    targetRole: "Frontend Developer",
    dailyHours: 2,
    level: "Beginner",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      navigate("/dashboard");
    }
  }, [isAuthed, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "dailyHours" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signupRequest(form);
      onAuthSuccess(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
      <p className="text-sm text-slate-400 mb-6">
        Tell us a bit about your goals to generate a personalized roadmap.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs mb-1 text-slate-300">Name</label>
          <input
            type="text"
            name="name"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Mukesh"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs mb-1 text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-xs mb-1 text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block mb-1 text-slate-300">Target role</label>
            <select
              name="targetRole"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.targetRole}
              onChange={handleChange}
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-slate-300">
              Daily study hours
            </label>
            <input
              type="number"
              name="dailyHours"
              min="1"
              max="8"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.dailyHours}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-700/60 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 py-2 text-sm font-medium"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
    </section>
  );
};

export default Signup;
