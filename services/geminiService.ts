
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MoodEntry, ReflectionAnalysis, Flashcard } from "../types";

// Initialize Gemini
// Note: In a real production app, ensure this is handled securely.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const getMoodInsight = async (entry: MoodEntry): Promise<string> => {
  try {
    const prompt = `
      User Mood Data:
      - Mood: ${entry.mood}
      - Energy Level (1-5): ${entry.energy}
      - Focus Level (1-5): ${entry.focus}

      You are "Cogni", an empathetic learning assistant. Based on this data, provide a ONE sentence encouraging insight or a tiny actionable tip to improve their study session. Keep it warm and professional.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "Keep pushing forward, you're doing great!";
  } catch (error) {
    console.error("Mood Insight Error:", error);
    return "Remember to take deep breaths and stay hydrated while learning.";
  }
};

export const analyzeReflection = async (reflectionText: string): Promise<ReflectionAnalysis> => {
  try {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        sentiment: { type: Type.STRING, description: "Overall sentiment (Positive, Neutral, Negative)" },
        keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3 key themes" },
        scores: {
          type: Type.OBJECT,
          properties: {
            confidence: { type: Type.NUMBER, description: "Score 1-100" },
            discipline: { type: Type.NUMBER, description: "Score 1-100" },
            criticalThinking: { type: Type.NUMBER, description: "Score 1-100 based on depth of thought" },
          },
          required: ["confidence", "discipline", "criticalThinking"]
        },
        feedback: { type: Type.STRING, description: "A short, constructive feedback on their critical thinking process." }
      },
      required: ["sentiment", "keywords", "scores", "feedback"]
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Analyze this student's reflection on their learning/AI usage: "${reflectionText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as ReflectionAnalysis;

  } catch (error) {
    console.error("Reflection Analysis Error:", error);
    // Fallback data
    return {
      sentiment: "Neutral",
      keywords: ["Learning", "Reflection", "Growth"],
      scores: { confidence: 50, discipline: 50, criticalThinking: 50 },
      feedback: "Great job reflecting! Try to dig deeper into *why* you chose specific answers next time."
    };
  }
};

export const generateFlashcards = async (topic: string): Promise<Flashcard[]> => {
  try {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          term: { type: Type.STRING, description: "The English word or phrase" },
          definition: { type: Type.STRING, description: "Simple definition in English" },
          example: { type: Type.STRING, description: "An example sentence using the term" },
          type: { type: Type.STRING, description: "Part of speech (Noun, Verb, Idiom, etc.)" }
        },
        required: ["term", "definition", "example", "type"]
      }
    };

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Create 5 advanced English vocabulary flashcards related to the topic: "${topic}". Focus on useful, academic, or professional terms.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as Flashcard[];
  } catch (error) {
    console.error("Flashcard Gen Error:", error);
    return [];
  }
};

export const chatWithCogni = async (history: {role: string, parts: {text: string}[]}[], newMessage: string) => {
  try {
    const chat = ai.chats.create({
      model: MODEL_NAME,
      history: history,
      config: {
        systemInstruction: "You are Cogni, a friendly and wise AI learning assistant for the Cognitex platform. Your goal is to help users develop critical thinking and self-regulation. Be concise, encouraging, and ask probing questions to help them find answers themselves rather than just giving answers.",
      },
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having a little trouble connecting to my knowledge base right now. Let's try again in a moment.";
  }
};
