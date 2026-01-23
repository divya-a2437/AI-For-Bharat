import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export const runtime = "nodejs";

export async function GET(request: Request) {
    // 1. Verify Vercel Cron Secret (Security)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Fetch users who have "Automated Mailing" enabled
    const users = await prisma.user.findMany({
        where: { autoMailEnabled: true }
    });

    for (const user of users) {
        // Logic to fetch user's tasks from the last week
        // Logic to call OpenAI API to generate summary
        // Logic to send email via Resend/Nodemailer
    }

    return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
    let prompt = "";
    try {
        const contentType = req.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            const body = await req.json();
            prompt = body.prompt;
        } else {
            const formData = await req.formData();
            prompt = formData.get("prompt")?.toString() || "Explain this file.";
            const file = formData.get("file") as File | null;
            if (file) {
                // For Ghostwriter, we might want to extract text from file too
                // But for now let's just use the filename
                prompt += `\n\nContext from file: ${file.name}`;
            }
        }
    } catch (e) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const result = streamText({
        model: openai('gpt-4o-mini'),
        prompt: `Complete the following code: \n\n ${prompt}`,
    });

    return result.toTextStreamResponse();
}