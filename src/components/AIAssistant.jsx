import { useState } from "react";
import { askAIRequest } from "../services/api";

const AIAssistant = ({ token, isDemo, stepContext }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      setStatus("Please enter a question.");
      return;
    }

    if (isDemo || !token) {
      setStatus("AI assistant is available in full mode.");
      return;
    }

    try {
      setLoading(true);
      setStatus("Thinking...");
      setAnswer("");

      const data = await askAIRequest(token, {
        question,
        stepContext,
      });

      setAnswer(data.answer);
      setStatus("");
    } catch (err) {
      const message =
        err.message?.toLowerCase().includes("quota") ||
        err.message?.toLowerCase().includes("limit")
          ? "AI usage limit reached. This feature is live but temporarily unavailable."
          : err.message || "AI service is temporarily unavailable.";

      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (text) => {
    setQuestion(text);
    setStatus("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Ask SkillBridge AI</h2>
        <p className="text-xs text-slate-400">
          Get beginner-friendly explanations and guidance for this step.
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => quickFill("Explain this step in simple terms")}
          className="text-[11px] px-3 py-1 rounded-xl border border-slate-700 hover:border-indigo-400 text-slate-300 hover:text-indigo-300"
        >
          Explain this step
        </button>
        <button
          type="button"
          onClick={() => quickFill("What should I focus on learning next?")}
          className="text-[11px] px-3 py-1 rounded-xl border border-slate-700 hover:border-indigo-400 text-slate-300 hover:text-indigo-300"
        >
          What should I learn next?
        </button>
      </div>

      <textarea
        className="w-full min-h-[90px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ask a question about this step..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />

      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-400">{status}</span>
        <button
          type="button"
          onClick={handleAsk}
          disabled={loading}
          className="px-4 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {answer && (
        <div className="rounded-xl bg-slate-900 p-3 text-xs text-slate-200 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
