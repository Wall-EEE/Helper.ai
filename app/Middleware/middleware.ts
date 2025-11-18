import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase.auth.getUser();

  if (!data.user && req.nextUrl.pathname.startsWith('/agents')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
