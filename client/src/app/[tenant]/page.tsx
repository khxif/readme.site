'use client';

import { GenerationLoader } from '@/components/loading/generation-loader';
import { Spinner } from '@/components/ui/spinner';
import { useGetProjectByName } from '@/hooks/queries';
import { useParams } from 'next/navigation';

export default function Page() {
  const { tenant } = useParams();

  const { data, isLoading } = useGetProjectByName(tenant as string);
  const html = data?.code;

  return (
    <main className="flex h-svh w-full items-center justify-center bg-linear-to-br from-background via-background to-primary/5">
      {!isLoading ? (
        data?.status === 'PENDING' ? (
          <GenerationLoader title="Loading" description="Preparing your workspace." />
        ) : (
          <iframe
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="h-full w-full border-0"
          />
        )
      ) : (
        <div
          className="flex w-full items-center justify-center"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Generating your project"
        >
          <Spinner className="size-8 text-primary" aria-hidden="true" />
        </div>
      )}
    </main>
  );
}
