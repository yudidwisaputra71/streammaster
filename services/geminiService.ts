
import { GoogleGenAI } from "@google/genai";

/**
 * Analyzes FFmpeg logs using Gemini 3 Flash to identify performance issues or errors.
 * Strictly follows @google/genai guidelines for client initialization and content generation.
 */
export const analyzeLogs = async (logText: string) => {
  // Always initialize with a named parameter for apiKey using process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following FFmpeg logs and identify if there are any critical errors or performance issues (like frame drops or encoding lag). Provide a brief summary and suggested fixes: \n\n${logText}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });
    // Property access .text (not a method) as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error analyzing logs. Please check your API configuration.";
  }
};
