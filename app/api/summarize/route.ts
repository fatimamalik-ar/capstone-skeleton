import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();
    if (typeof notes !== "string" || notes.trim().length < 20) {
      return NextResponse.json(
        { error: "Please paste at least a few sentences of notes." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
     model: "gemini-flash-latest",
      contents: notes.slice(0, 8000),
      config: {
        systemInstruction:
          'You help students study. Reply with ONLY valid JSON in this shape: {"summary": string, "keyPoints": string[], "quiz": [{"question": string, "answer": string}]}. Give a 2-3 sentence summary, 5 key points, and exactly 3 quiz questions.',
        responseMimeType: "application/json",
      },
    });

    const clean = (response.text ?? "").replace(/```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(clean));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not summarize right now. Please try again." },
      { status: 500 }
    );
  }
}