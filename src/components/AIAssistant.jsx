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
      setStatus(err.message || "Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
      <h2 className="text-sm font-semibold">Ask SkillBridge AI</h2>

      <p className="text-xs text-slate-400">
        Ask questions about this step or what to focus on next.
      </p>

      <textarea
        className="w-full min-h-20 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="e.g. Explain this step in simple terms"
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
          className="px-3 py-1 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {answer && (
        <div className="mt-3 rounded-xl bg-slate-900 p-3 text-xs text-slate-200 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
