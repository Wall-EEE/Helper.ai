import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


export async function GET(_: Request, { params }: any) {
const { data, error } = await supabase
.from('agents')
.select('*')
.eq('id', params.id)
.single();


return NextResponse.json({ data, error });
}


export async function PUT(req: Request, { params }: any) {
const body = await req.json();
const { data, error } = await supabase
.from('agents')
.update(body)
.eq('id', params.id)
.select();


return NextResponse.json({ data, error });
}


export async function DELETE(_: Request, { params }: any) {
const { error } = await supabase.from('agents').delete().eq('id', params.id);
return NextResponse.json({ success: !error });
}