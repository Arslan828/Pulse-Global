
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemInsights = async (metrics: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze these system metrics and provide 3 brief strategic insights for the admin. Metrics: ${JSON.stringify(metrics)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            insight: { type: Type.STRING },
            priority: { type: Type.STRING }
          },
          required: ["title", "insight", "priority"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const fetchGlobalNews = async (query: string = "top global news headlines today") => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Find the most recent and important global news for: "${query}". 
    Summarize the top 5 stories. For each story, provide a title, a 2-sentence summary, and a category.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text;
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  // Extract URLs to satisfy grounding requirements
  const sources = groundingChunks
    .map((chunk: any) => chunk.web)
    .filter((web: any) => web && web.uri);

  return {
    text,
    sources
  };
};

export const generateContentDraft = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a short blog post draft about: ${topic}. Include a title and 2 paragraphs.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          body: { type: Type.STRING }
        },
        required: ["title", "body"]
      }
    }
  });
  return JSON.parse(response.text);
};
