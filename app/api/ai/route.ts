import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabaseClient';


const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(req: Request) {
try {
const { agentId, message } = await req.json();


const { data: agent } = await supabase
.from('agents')
.select('*')
.eq('id', agentId)
.single();


if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });


const finalPrompt = `${agent.base_prompt}
User: ${message}`;


const completion = await client.chat.completions.create({
model: 'gpt-4o-mini',
messages: [{ role: 'user', content: finalPrompt }]
});


return NextResponse.json({ reply: completion.choices[0].message.content });
} catch (err) {
return NextResponse.json({ error: 'AI route error', details: err }, { status: 500 });
}
}