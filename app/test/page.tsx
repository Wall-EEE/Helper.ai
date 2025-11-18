export default function Page() {
  return (
    <pre>
      {JSON.stringify(
        {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 5),
        },
        null,
        2
      )}
    </pre>
  );
}
