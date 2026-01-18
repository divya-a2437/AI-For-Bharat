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
  2. Break down the content into predictions, a technical matrix, a Mermaid.js logic flow, vault blocks, a dependency matrix, and a technical gap analysis.
  
  For 'vaultBlocks', automatically sort information into these three buckets:
  - Syntax: Essential code snippets and API definitions.
  - Logic: The "why" behind the implementation patterns.
  - Architecture: High-level system design and dependency relationships.

  For 'dependencyMatrix', detect libraries/frameworks (e.g., Next.js, OpenAI, Tailwind) and flag their 'impact' (High Impact | Low Impact) and 'role' in the project.

  For 'gapAnalysis', compare the core logic/tech stack found in the text against industry standards. Identify:
  - 'gap': The missing concept or skill.
  - 'vulnerability': Why this gap is critical for this specific project.
  - 'bridgeAction': A specific simulated task or mock question to close the gap.

  JSON structure:
  {
    "predictions": [ { "question": "string", "confidence": number, "reason": "string" } ],
    "technicalMatrix": [ { "concept": "string", "difficulty": "string", "priority": "string", "prob": number } ],
    "mermaidChart": "string (Valid Mermaid.js 'graph TD' syntax representing the logic flow)",
    "vaultBlocks": [ { "title": "string", "content": "string", "category": "syntax" | "logic" | "architecture", "tags": ["string"] } ],
    "dependencyMatrix": [ { "library": "string", "impact": "High Impact" | "Low Impact", "role": "string", "version": "string | unknown" } ],
    "gapAnalysis": [ { "gap": "string", "vulnerability": "string", "bridgeAction": "string", "type": "lesson" | "mock" } ]
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
