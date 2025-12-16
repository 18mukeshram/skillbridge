import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/api";
import { demoUser } from "../demo/demoUser";
import { demoRoadmap } from "../demo/demoRoadmap";

const Login = ({ onAuthSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginRequest(form);
      onAuthSuccess(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUserData = {
      ...demoUser,
      isDemo: true,
    };

    // Use SAME storage key as real auth
    onAuthSuccess(demoUserData, "demo-token");

    // Store demo roadmap separately
    localStorage.setItem("demoRoadmap", JSON.stringify(demoRoadmap));

    navigate("/dashboard");
  };
  return (
    <section className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
      <p className="text-sm text-slate-400 mb-6">
        Log in to access your personalized learning roadmap and progress.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
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
          {loading ? "Logging in..." : "Log in"}
        </button>
        <button onClick={handleDemoLogin} className="secondary-btn">
          Try Demo
        </button>
      </form>
    </section>
  );
};

export default Login;
