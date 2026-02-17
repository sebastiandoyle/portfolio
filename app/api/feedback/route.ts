import { NextResponse } from 'next/server';
import { FEEDBACK_PROMPTS, getTopPrompts } from '@/lib/feedback-data';
import type { FeedbackPrompt } from '@/lib/feedback-data';

// In-memory vote store — replace with Vercel KV in production
const voteStore = new Map<string, number>();

// Initialize from mock data
FEEDBACK_PROMPTS.forEach((p) => {
  voteStore.set(p.id, p.votes);
});

function getCurrentPrompts(): FeedbackPrompt[] {
  return FEEDBACK_PROMPTS.map((p) => ({
    ...p,
    votes: voteStore.get(p.id) ?? p.votes,
  }));
}

export async function GET() {
  const prompts = getCurrentPrompts();
  const top = getTopPrompts(prompts, 3);
  return NextResponse.json({ prompts: top });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { promptId } = body as { promptId: string };

  if (!promptId || !voteStore.has(promptId)) {
    return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
  }

  const current = voteStore.get(promptId)!;
  voteStore.set(promptId, current + 1);

  return NextResponse.json({ promptId, votes: current + 1 });
}
