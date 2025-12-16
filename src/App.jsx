import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StepDetailsPage from "./pages/StepDetailsPage";

// Helper: read auth from localStorage once, safely
const getInitialAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const stored = localStorage.getItem("skillbridge_auth");
  if (!stored) {
    return { user: null, token: null };
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object" && "token" in parsed) {
      return parsed;
    }
  } catch {
    // ignore parse errors
  }

  return { user: null, token: null };
};

function App() {
  const [auth, setAuth] = useState(getInitialAuth);
  const [authReady] = useState(true); // since we read synchronously, it's immediately ready

  const navigate = useNavigate();

  const handleAuthChange = (user, token) => {
    const data = { user, token };
    setAuth(data);
    localStorage.setItem("skillbridge_auth", JSON.stringify(data));
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("skillbridge_auth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar user={auth.user} onLogout={handleLogout} />

      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Landing user={auth.user} />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <Login onAuthSuccess={handleAuthChange} isAuthed={!!auth.user} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup onAuthSuccess={handleAuthChange} isAuthed={!!auth.user} />
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              auth?.user ? (
                <Dashboard auth={auth} authReady={authReady} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Roadmap step details (with notes) */}
          <Route path="/roadmap/step/:id" element={<StepDetailsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
