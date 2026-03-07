"use client";

import { getErrorMessage } from '@/lib/utils';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: 1 },
  },
  mutationCache: new MutationCache({
    onError: onQueryMutationError,
  }),
});

function onQueryMutationError(error: Error) {
  toast.error(getErrorMessage(error));
}

export function TanstackQueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
}
