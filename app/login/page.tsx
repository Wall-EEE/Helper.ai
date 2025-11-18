'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle magic link when page loads
  useEffect(() => {
    const handleMagicLink = async () => {
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true, // store the session in local storage
      });

      if (error) {
        console.error('Error getting session from URL:', error);
      } else if (data.session) {
        console.log('User logged in via magic link:', data.session.user);
        // Redirect to homepage or dashboard
        router.replace('/');
      }
    };

    handleMagicLink();
  }, [router]);

  async function handleLogin() {
    setLoading(true);
    setStatus(null);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin, // must match your Supabase site URL
        },
      });

      console.log('Supabase signInWithOtp data:', data);
      console.log('Supabase signInWithOtp error:', error);

      if (error) {
        setStatus(`Error sending magic link: ${error.message}`);
      } else {
        setStatus(`Magic link sent! Check your email: ${email}`);
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setStatus('Unexpected error occurred. Check console.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto space-y-6">
      <h1 className="text-3xl font-semibold text-center">Login</h1>

      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <Button onClick={handleLogin} className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>

      {status && (
        <p className="text-center mt-2 text-sm text-muted-foreground">{status}</p>
      )}
    </div>
  );
}
