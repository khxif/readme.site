'use client';

import { useGetProjectByName } from '@/hooks/queries';
import { useParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Page() {
  const { tenant } = useParams();
  const { data, isLoading } = useGetProjectByName(tenant as string);
  const html = data?.code;

  // Calculate progress based on loading state
  const progress = isLoading ? 25 : data?.status === 'PENDING' ? 75 : 100;
  const currentStepIndex = isLoading ? 0 : data?.status === 'PENDING' ? 2 : 3;

  return (
    <main
      className="h-svh w-full bg-linear-to-br from-background via-background to-primary/5 
    flex items-center justify-center"
    >
      {!isLoading ? (
        data?.status === 'PENDING' ? (
          <Card className="w-full max-w-md border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm bg-card/80">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                  <Spinner className="size-8 text-primary relative z-10" />
                </div>
                <div>
                  <CardTitle className="text-xl">Generating Your Project</CardTitle>
                  <CardDescription>Almost ready... hang tight!</CardDescription>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <StepIndicator
                  key={step.id}
                  step={step}
                  status={
                    index < currentStepIndex
                      ? 'completed'
                      : index === currentStepIndex
                        ? 'current'
                        : 'pending'
                  }
                  isActive={index <= currentStepIndex}
                />
              ))}
            </CardContent>
          </Card>
        ) : (
          <iframe
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        )
      ) : (
        <Card className="w-full max-w-md border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm bg-card/80">
          <CardHeader className="space-y-3 pb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
                <Spinner className="size-8 text-primary relative z-10" />
              </div>
              <div>
                <CardTitle className="text-xl">Starting Up</CardTitle>
                <CardDescription>Preparing your workspace...</CardDescription>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {steps.map((step, index) => (
              <StepIndicator
                key={step.id}
                step={step}
                status={
                  index < currentStepIndex
                    ? 'completed'
                    : index === currentStepIndex
                      ? 'current'
                      : 'pending'
                }
                isActive={index <= currentStepIndex}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}

const steps = [
  { id: 1, title: 'Initializing', description: 'Setting up environment' },
  { id: 2, title: 'Processing', description: 'Analyzing requirements' },
  { id: 3, title: 'Generating', description: 'Creating your project' },
  { id: 4, title: 'Finalizing', description: 'Polishing the results' },
];

function StepIndicator({
  step,
  status,
  isActive,
}: {
  step: (typeof steps)[0];
  status: 'completed' | 'current' | 'pending';
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        'relative flex items-start gap-3 transition-all duration-500',
        isActive ? 'opacity-100' : 'opacity-40',
      )}
    >
      <div className="relative shrink-0">
        {status === 'completed' && (
          <CheckCircle2 className="size-6 text-emerald-500 dark:text-emerald-400 transition-all duration-300 scale-100" />
        )}
        {status === 'current' && (
          <Loader2 className="size-6 text-primary animate-spin transition-all duration-300" />
        )}
        {status === 'pending' && (
          <Circle className="size-6 text-muted-foreground/50 transition-all duration-300" />
        )}
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'text-sm font-medium transition-colors duration-300',
            status === 'current'
              ? 'text-primary'
              : status === 'completed'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-muted-foreground',
          )}
        >
          {step.title}
        </span>
        <span
          className={cn(
            'text-xs transition-colors duration-300',
            status === 'current' || status === 'completed'
              ? 'text-muted-foreground'
              : 'text-muted-foreground/50',
          )}
        >
          {step.description}
        </span>
      </div>
    </div>
  );
}
