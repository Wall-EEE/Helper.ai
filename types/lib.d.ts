declare module "@/lib/supabaseServer" {
  export function supabaseServer(): import("@supabase/supabase-js").SupabaseClient;
}
