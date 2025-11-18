import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(_: Request, { params }: any) {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', params.id)
    .single();

  return NextResponse.json({ data, error });
}

export async function PUT(req: Request, { params }: any) {
  const supabase = supabaseServer();
  const body = await req.json();
  const { data, error } = await supabase
    .from('prompts')
    .update(body)
    .eq('id', params.id)
    .select();

  return NextResponse.json({ data, error });
}

export async function DELETE(_: Request, { params }: any) {
  const supabase = supabaseServer();
  const { error } = await supabase.from('prompts').delete().eq('id', params.id);
  return NextResponse.json({ success: !error });
}
