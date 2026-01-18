import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Buffer } from "buffer";

// Neural Engine Integration: burrito-x (JAX Backend)
// Fallback logic for scripts/neural_engine.py is initialized below
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        // Extract text (Simple version: in production use 'pdf-parse')
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const rawText = buffer.toString('utf-8').slice(0, 4000); // Limit context for API

        const prompt = `
  You are the Ghostwriter Hackathon Engine. Purpose: Win the competition by performing extreme technical distillation on the provided context.
  
  1. SIGNAL EXTRACTION (30% vs 70%): Identify the core technical alpha that drives the majority of project value.
  2. BATTLE PLAN: Map out a high-speed execution path with strategic priorities and architectural flows.
  3. COMPETITIVE EDGE: Identify critical technical gaps and provide 'bridgeAction' tasks to ensure a flawless demo.

  IMPORTANT: To save tokens and optimize for high-frequency processing, return a JSON object with compact CSV strings (DELIMITER: '|'). DO NOT include headers.

  JSON structure:
  {
    "predictions": "priority_task|confidence_score|strategic_impact",
    "technicalMatrix": "concept|difficulty|hackathon_priority|prob",
    "mermaidChart": "string (Valid Mermaid.js 'graph TD' syntax for the optimized winning architecture)",
    "vaultBlocks": "title|content|category(Syntax|Logic|Architecture)|tags",
    "dependencyMatrix": "library|strategic_value|role|version",
    "gapAnalysis": "gap|risk_to_demo|bridgeAction|type(lesson|mock)",
    "distillation": "# Winning Hackathon Strategy\n\n[Markdown summary of the tech alpha, MVP core, and execution roadmap. Use bolding and high-impact terminology.]"
  }

  Context: "${rawText}"
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
            max_tokens: 2048,
        });

        const rawContent = response.choices[0].message.content;
        if (!rawContent) throw new Error("No content generated");

        const data = JSON.parse(rawContent);

        /**
         * Compact "CSV-within-JSON" structure requested from AI:
         * {
         *   "predictions": "question|confidence|reason",
         *   "technicalMatrix": "concept|difficulty|priority|prob",
         *   "vaultBlocks": "title|content|category|tags(comma-separated)",
         *   "distillation": "markdown..."
         * }
         */

        // Helper to parse CSV strings back to Objects
        const parseCSV = (csv: string, keys: string[]) => {
            if (!csv) return [];
            return csv.split('\n').filter(line => line.trim()).map(line => {
                const values = line.split('|');
                const obj: any = {};
                keys.forEach((key, i) => {
                    let val = values[i]?.trim();
                    if (key === 'confidence' || key === 'prob') obj[key] = parseFloat(val) || 0;
                    else if (key === 'tags') obj[key] = val ? val.split(',').map(t => t.trim()) : [];
                    else obj[key] = val || "";
                });
                return obj;
            });
        };

        const finalized = {
            predictions: parseCSV(data.predictions, ['question', 'confidence', 'reason']),
            technicalMatrix: parseCSV(data.technicalMatrix, ['concept', 'difficulty', 'priority', 'prob']),
            mermaidChart: data.mermaidChart,
            vaultBlocks: parseCSV(data.vaultBlocks, ['title', 'content', 'category', 'tags']),
            dependencyMatrix: parseCSV(data.dependencyMatrix, ['library', 'impact', 'role', 'version']),
            gapAnalysis: parseCSV(data.gapAnalysis, ['gap', 'vulnerability', 'bridgeAction', 'type']),
            distillation: data.distillation
        };

        return NextResponse.json(finalized);
    } catch (error) {
        console.error("Prediction error:", error);
        return NextResponse.json({ error: "Prediction Engine Failed" }, { status: 500 });
    }
}
