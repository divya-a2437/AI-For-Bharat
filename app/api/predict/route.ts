import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Buffer } from "buffer";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file = data.get("file") as File | null;

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        // Extract text (Simple version: in production use 'pdf-parse')
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const rawText = buffer.toString('utf-8').slice(0, 4000); // Limit context for API

        const prompt = `
  You are a Technical Literacy Agent. Analyze the uploaded documentation/codebase.
  1. Identify the 'Core Logic' (The 30% signal that explains the 70% noise).
  2. Break down the content into predictions, a technical matrix, and a Mermaid.js logic flow.

  JSON structure:
  {
    "predictions": [ { "question": "string", "confidence": number, "reason": "string" } ],
    "technicalMatrix": [ { "concept": "string", "difficulty": "string", "priority": "string", "prob": number } ],
    "mermaidChart": "string (Valid Mermaid.js 'graph TD' syntax representing the logic flow)"
  }

  Context: "${rawText}"
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error("No content generated");
        }

        return NextResponse.json(JSON.parse(content));
    } catch (error) {
        console.error("Prediction error:", error);
        return NextResponse.json({ error: "Prediction Engine Failed" }, { status: 500 });
    }
}
