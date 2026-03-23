'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useGoogleLoginMutation } from '@/hooks/mutations';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CallbackPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);

  const { mutateAsync } = useGoogleLoginMutation();

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSession();
      console.log(error);
      console.log(data);
      if (error) {
        toast.error('Authentication failed. Please try again.');
        router.push('/auth/login');
        return;
      }

      await mutateAsync();

      router.push('/dashboard');
      toast.success('Successfully signed in!');
    }

    handleAuth();
  }, [router, mutateAsync]);

  const { heading, subtext } = PHASES[phase];

  return (
    <Card className="w-full max-w-sm py-0 shadow-md">
      <CardContent className="flex flex-col items-center gap-7 px-8 py-10">
        <div className="flex items-center justify-center size-10 rounded-full bg-muted">
          <Spinner className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>

        <div
          className="flex flex-col items-center gap-1.5 text-center"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm font-medium text-foreground">{heading}</p>
          <p className="text-[11px] text-muted-foreground">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const PHASES = [
  { heading: 'Signing you in…', subtext: 'Completing authentication.' },
  { heading: 'Redirecting to your dashboard…', subtext: 'Almost there.' },
] as const;
