'use client';

import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/supabase/client';

export function LoginView() {
  const [isPending, setIsPending] = useState(false);

  async function handleGoogleSignIn() {
    setIsPending(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Card className="w-full max-w-sm py-0 shadow-md">
      <CardContent className="flex flex-col gap-8 px-8 py-9">
        <div className="flex flex-col gap-2">
          <span
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground select-none"
            aria-hidden="true"
          >
            readme.site
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground leading-snug">
              Welcome back
            </h1>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Sign in to continue to your workspace.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full transition-all duration-200"
          onClick={handleGoogleSignIn}
          disabled={isPending}
          aria-label={isPending ? 'Signing in with Google' : 'Sign in with Google'}
        >
          {isPending ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <GoogleIcon />
          )}
          {isPending ? 'Signing in\u2026' : 'Continue with Google'}
        </Button>

        <div className="flex flex-col gap-4">
          <Separator />
          <p className="text-center text-[11px] text-muted-foreground leading-relaxed">
            By continuing, you agree to our{' '}
            <Link
              href="/terms"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors duration-150"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
