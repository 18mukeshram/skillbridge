import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSummary from "../components/ProgressSummary";
import RoadmapCard from "../components/RoadmapCard";
import ResourceList from "../components/ResourceList";
import StepDetail from "../components/StepDetail";
import { getRoadmapRequest, updateStepStatusRequest } from "../services/api";

const Dashboard = ({ auth, authReady }) => {
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState([]);
  const [userMeta, setUserMeta] = useState(null);
  const [error, setError] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);
  const navigate = useNavigate();

  // helper to recompute progress from steps
  const computeProgress = (steps) => {
    const realSteps = steps.filter((s) => s.status !== "info");
    if (realSteps.length === 0) return 0;
    const completed = realSteps.filter((s) => s.status === "completed").length;
    return Math.round((completed / realSteps.length) * 100);
  };

  const fetchRoadmap = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getRoadmapRequest(auth.token);
      const steps = data.roadmap || [];
      setRoadmap(steps);
      setUserMeta({
        ...data.user,
        progress: data.user?.progress ?? computeProgress(steps),
      });
      setSelectedStep(steps[0] || null);
    } catch (err) {
      setError(err.message || "Failed to load roadmap");
    } finally {
      setLoading(false);
    }
  }, [auth?.token]);

  const handleStatusToggle = async (step) => {
    if (step.status === "info") return;

    const order = ["not-started", "in-progress", "completed"];
    const currentIndex = order.indexOf(step.status);
    const nextStatus = order[(currentIndex + 1) % order.length];

    // ✅ Optimistic update in UI
    setRoadmap((prev) => {
      const updated = prev.map((s) =>
        s.id === step.id ? { ...s, status: nextStatus } : s
      );
      setUserMeta((prevMeta) =>
        prevMeta
          ? { ...prevMeta, progress: computeProgress(updated) }
          : prevMeta
      );
      return updated;
    });

    // ✅ Demo mode
    if (auth?.user?.isDemo) return;

    // 🔒 Real mode → API call
    if (!auth?.token) return;

    try {
      await updateStepStatusRequest(auth.token, step.id, nextStatus);
      // optional: re-sync from server if you want
      // await fetchRoadmap();
    } catch (err) {
      setError(err.message || "Failed to update step status");
    }
  };

  useEffect(() => {
    if (!authReady) return;

    // ✅ DEMO MODE
    if (auth?.user?.isDemo) {
      const demo = localStorage.getItem("demoRoadmap");
      if (demo) {
        const steps = JSON.parse(demo);
        setRoadmap(steps);
        setUserMeta({
          name: auth.user.name,
          targetRole: auth.user.role || "Developer",
          dailyHours: auth.user.dailyHours || 2,
          progress: computeProgress(steps),
        });
        setSelectedStep(steps[0] || null);
      }
      setLoading(false);
      return;
    }

    // 🔒 REAL AUTH REQUIRED
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    // 🌐 REAL API MODE
    fetchRoadmap();
  }, [authReady, auth, navigate, fetchRoadmap]);

  if (!authReady) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-slate-300">Loading your dashboard...</p>
      </section>
    );
  }

  if (authReady && !auth?.token) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-xs text-slate-400">
            Personalized roadmap for your{" "}
            <span className="font-semibold">
              {userMeta?.targetRole || "Developer"}
            </span>{" "}
            journey.
          </p>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full border border-slate-700 text-slate-300">
          Mode: {auth?.user?.isDemo ? "Demo" : "Connected to API"}
        </span>
      </header>

      {loading && (
        <p className="text-sm text-slate-300">Loading your roadmap...</p>
      )}

      {error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-700/60 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      {!loading && !error && userMeta && (
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-4">
            <ProgressSummary
              user={{
                name: userMeta.name,
                targetRole: userMeta.targetRole,
                dailyHours: userMeta.dailyHours,
                progress: userMeta.progress ?? 0,
              }}
            />

            <div className="space-y-3">
              <h2 className="text-sm font-semibold">Roadmap steps</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {roadmap.map((step) => (
                  <RoadmapCard
                    key={step.id}
                    step={step}
                    onToggleStatus={handleStatusToggle}
                    isActive={selectedStep?.id === step.id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <StepDetail step={selectedStep} />
            <ResourceList />
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
