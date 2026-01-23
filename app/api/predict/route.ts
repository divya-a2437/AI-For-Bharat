import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { processPDF } from "@/lib/ai/ingestion";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    try {
        console.log("Prediction request received");
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            console.log("No file provided in request");
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        console.log(`Processing file: ${file.name} (${file.type})`);
        let rawText = "";

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            console.log("PDF detected, starting extraction...");
            const chunks = await processPDF(file);
            console.log(`PDF processed, extracted ${chunks.length} chunks`);
            // Join first few chunks to fit context limits, or all if small
            rawText = chunks.map(c => c.pageContent).join("\n").slice(0, 8000);
        } else {
            console.log("Non-PDF file detected, reading as text...");
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            rawText = buffer.toString('utf-8').slice(0, 4000);
        }

        console.log(`Extracted ${rawText.length} characters of text. Sending to OpenAI...`);

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

        console.log("OpenAI response received");
        const rawContent = response.choices[0].message.content;
        if (!rawContent) throw new Error("No content generated");

        const data = JSON.parse(rawContent);
        console.log("JSON parsed successfully");

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

        console.log("Prediction finalization complete");
        return NextResponse.json(finalized);
    } catch (error: any) {
        console.error("Prediction error stack:", error.stack || error);
        return NextResponse.json({ error: "Prediction Engine Failed", details: error.message }, { status: 500 });
    }
}
