import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseServer } from '@/lib/supabaseServer';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { agentId, message } = await req.json();

    // Server-side Supabase client
    const supabase = supabaseServer();

    // Get the logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Fetch agent settings
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    // Build final prompt
    const finalPrompt = `${agent.base_prompt}\nUser: ${message}`;

    // Call OpenAI Responses API
    const completion = await client.responses.create({
      model: agent.model || 'gpt-4o-mini',
      reasoning: agent.reasoning || { effort: 'none' },
      input: finalPrompt,
    });

    // Safely extract text from the response
    let reply = '';
    if (completion.output_text) {
      reply = completion.output_text;
    } else if (completion.output?.length) {
      for (const item of completion.output) {
        if ('content' in item && Array.isArray(item.content)) {
          const textItem = item.content.find(c => c.type === 'output_text');
          if (textItem && 'text' in textItem) {
            reply += textItem.text;
          }
        }
      }
    }

    // Save conversation in Supabase
    await supabase.from('conversations').insert({
      agent_id: agentId,
      user_id: user.id,
      role: 'assistant',
      content: reply,
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('AI route error:', err);
    return NextResponse.json({ error: 'AI route error', details: err }, { status: 500 });
  }
}
