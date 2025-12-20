import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { question, stepContext } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    // ---- Prompt Design (Explicit & Explainable) ----
    const systemPrompt = `
You are a friendly programming mentor.
Explain concepts in very simple language.
Use step-by-step explanations.
Avoid jargon unless you explain it clearly.
Assume the learner is a beginner.
`;

    const contextPrompt = stepContext
      ? `
Current roadmap step:
Title: ${stepContext.title || "N/A"}
Focus: ${stepContext.focus || "N/A"}
Topics: ${(stepContext.topics || []).join(", ")}
Goal: ${stepContext.outcome || "N/A"}
`
      : "";

    const userPrompt = `
Student question:
"${question}"
`;

    const constraints = `
Rules:
- Keep the answer under 200 words
- Use bullet points when helpful
- Be practical and beginner-friendly
`;

    const finalPrompt = `
${systemPrompt}
${contextPrompt}
${constraints}
${userPrompt}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `${contextPrompt}\n${constraints}\n${userPrompt}`,
        },
      ],
      temperature: 0.4,
    });

    const answer = response.choices[0]?.message?.content;

    res.json({ answer });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ message: "AI service failed" });
  }
};
