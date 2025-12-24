import { GoogleGenAI } from "@google/genai";
import { UserDecision } from "../types.ts";

export const getAIAnalysis = async (decisions: UserDecision[]) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const summary = decisions
    .map(
      (d) =>
        `- Cat: ${d.category}, Choice: ${d.choice}, Time: ${d.timeTaken.toFixed(
          2
        )}s, TO: ${d.timedOut}`
    )
    .join("\n");

  const prompt = `
    Analyze this sequence of 25 rapid-fire psychological decisions.
    
    Data Sequence:
    ${summary}

    Task:
    1. Generate a "Neural Archetype" which must be exactly 5 distinct words (separated by periods) that summarize their behavior (e.g., SWIFT. ANALYTICAL. BOLD. CAUTIOUS. ADAPTIVE).
    2. Provide a 3-sentence deep behavioral insight.
    
    Return the response in this format:
    ARCHETYPE: [5 WORDS]
    INSIGHT: [3 SENTENCES]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "ARCHETYPE: UNPREDICTABLE. COMPLEX. ANOMALY. NEURAL. FRAGMENT. \nINSIGHT: Your decision pathways defy standard categorization. You alternate between extreme speed and deep calculation. This hybrid nature makes you a wildcard in systemic environments.";
  }
};
