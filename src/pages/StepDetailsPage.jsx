import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { stepDetails } from "../data/stepDetails";
import { getNoteRequest, saveNoteRequest } from "../services/api";

const StepDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [note, setNote] = useState("");
  const [noteStatus, setNoteStatus] = useState("");
  const [loadingNote, setLoadingNote] = useState(true);

  const stepFromState = location.state?.step || null;
  const detailKey = stepFromState?.detailKey || null;
  const detail = detailKey ? stepDetails[detailKey] : null;

  const title = detail?.title || stepFromState?.title || "Roadmap step";
  const focus = stepFromState?.focus;

  const handleBack = () => {
    if (location.state?.from === "dashboard") {
      navigate("/dashboard");
    } else {
      navigate(-1);
    }
  };

  const getToken = () => {
    try {
      const stored = localStorage.getItem("skillbridge_auth");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return parsed.token || null;
    } catch {
      return null;
    }
  };

  // Load note
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoadingNote(false);
      setNoteStatus("Log in to save notes.");
      return;
    }

    const fetchNote = async () => {
      try {
        setLoadingNote(true);
        const data = await getNoteRequest(token, id);
        setNote(data.content || "");
        setNoteStatus(
          data.updatedAt ? "Note loaded." : "No notes yet. Start writing!"
        );
      } catch {
        setNoteStatus("Could not load note.");
      } finally {
        setLoadingNote(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSaveNote = async () => {
    const token = getToken();
    if (!token) {
      setNoteStatus("Please log in to save notes.");
      return;
    }

    try {
      setNoteStatus("Saving...");
      const data = await saveNoteRequest(token, id, note);
      setNote(data.content);
      setNoteStatus("Saved!");
      setTimeout(() => setNoteStatus(""), 1500);
    } catch {
      setNoteStatus("Failed to save note.");
    }
  };

  // rest of your JSX stays the same, just make sure it uses `detail`
  // like we had before

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 space-y-5">
      <button
        type="button"
        onClick={handleBack}
        className="text-xs text-slate-300 mb-2 hover:text-indigo-300"
      >
        ← Back to dashboard
      </button>

      <div className="space-y-2">
        <p className="text-[11px] text-slate-400 uppercase tracking-wide">
          Roadmap step detail
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {focus && (
          <p className="text-sm text-slate-300">
            <span className="font-semibold">Focus: </span>
            {focus}
          </p>
        )}
      </div>

      {/* existing detail layout here (topics/resources/etc) ... */}

      {detail ? (
        <div className="grid md:grid-cols-2 gap-6 text-xs">
          {/* left column: topics & practice */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold mb-2">
                What you&apos;ll learn
              </h2>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {detail.topics.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-2">Practice ideas</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {detail.practiceIdeas.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* right column: resources + notes */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold mb-2">
                Recommended resources
              </h2>
              <ul className="space-y-2">
                {detail.resources.map((r, idx) => (
                  <li key={idx}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2"
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-semibold mb-1">
                Your notes for this step
              </h2>
              <textarea
                className="w-full min-h-[120px] rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={
                  loadingNote
                    ? "Loading your notes..."
                    : "Write quick reminders, links, or what you want to revise later."
                }
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={loadingNote}
              />
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{noteStatus}</span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={loadingNote}
                  className="px-3 py-1 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
                >
                  Save note
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-2">Goal of this step</h2>
              <p className="text-slate-300">{detail.outcome}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Detailed content for this step hasn&apos;t been added yet. You can use
          this step as a milestone and attach your own notes and resources.
        </p>
      )}
    </section>
  );
};

export default StepDetailsPage;

// const statusStyles = {
//   "in-progress": "border-indigo-500/70",
//   completed: "border-green-500/70",
//   "not-started": "border-slate-700",
// };

// const statusTextStyles = {
//   "in-progress": "text-indigo-300",
//   completed: "text-green-300",
//   "not-started": "text-slate-400",
// };

// const statusText = {
//   "in-progress": "In progress",
//   completed: "Completed",
//   "not-started": "Not started",
// };
