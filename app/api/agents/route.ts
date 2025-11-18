import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


export async function GET() {
const { data, error } = await supabase.from('agents').select('*');
return NextResponse.json({ data, error });
}


export async function POST(req: Request) {
const body = await req.json();
const { data, error } = await supabase.from('agents').insert(body).select();
return NextResponse.json({ data, error });
}