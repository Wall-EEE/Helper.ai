'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.replace('/login');
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="font-semibold text-lg">Helper.ai</div>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="font-medium">{user.email}</span>
              <a href="/agents" className="hover:underline">Agents</a>
              <a href="/prompts" className="hover:underline">Prompts</a>
              <button
                className="text-red-500 hover:underline"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <a href="/login" className="hover:underline">Login</a>
          )}
        </div>
      </nav>
    </header>
  );
}
