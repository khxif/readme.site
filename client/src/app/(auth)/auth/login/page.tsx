'use client';

import { Button } from '@/components/ui/button';
import { supabase } from '@/supabase/client';

export default function LoginPage() {
  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
