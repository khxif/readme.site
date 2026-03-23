'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

const DEFAULT_MESSAGES = [
  'Analyzing requirements...',
  'Generating UI...',
  'Optimizing layout...',
  'Refining interactions...',
  'Finalizing output...',
] as const;

type GenerationLoaderProps = {
  title: string;
  description: string;
  messages?: readonly string[];
};

export function GenerationLoader({
  title,
  description,
  messages = DEFAULT_MESSAGES,
}: GenerationLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let isMounted = true;

    const scheduleNextMessage = () => {
      const delay = Math.floor(Math.random() * 3000) + 5000;

      timeoutId = setTimeout(() => {
        if (!isMounted) {
          return;
        }

        setMessageIndex((prev) => (prev + 1) % messages.length);
        scheduleNextMessage();
      }, delay);
    };

    scheduleNextMessage();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [messages]);

  return (
    <Card
      className="w-full max-w-md border-border/60 bg-card/90 shadow-xl backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={`${title} ${messages[messageIndex]}`}
    >
      <CardHeader className="space-y-3 text-center">
        <div className="flex w-full justify-center">
          <Spinner className="size-7 text-primary" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl tracking-tight">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="relative h-6 min-w-56">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={messages[messageIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 text-center text-sm text-muted-foreground"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
