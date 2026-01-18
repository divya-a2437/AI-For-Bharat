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
    const { prompt } = await req.json();

    const result = streamText({
        model: openai('gpt-4-turbo'),
        prompt: `Complete the following code: \n\n ${prompt}`,
    });

    return result.toTextStreamResponse();
}