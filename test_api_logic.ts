import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

async function test() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || '',
        baseURL: process.env.OPENAI_BASE_URL || undefined,
    });

    try {
        const modelName = process.env.OPENAI_BASE_URL?.includes("openrouter.ai")
            ? "openai/gpt-4o-mini"
            : "gpt-4o-mini";

        console.log("Using model:", modelName);
        console.log("API Key:", process.env.OPENAI_API_KEY?.slice(0, 10) + "...");

        const response = await openai.chat.completions.create({
            model: modelName,
            messages: [{ role: "user", content: "Return a JSON object with a key 'test' and value 'success'" }],
            response_format: { type: "json_object" },
        });

        console.log("Response:", response.choices[0].message.content);
    } catch (error: any) {
        console.error("FAILED!");
        console.error("Status:", error.status);
        console.error("Message:", error.message);
        if (error.response) {
            console.error("Response:", await error.response.text());
        }
    }
}

test();
