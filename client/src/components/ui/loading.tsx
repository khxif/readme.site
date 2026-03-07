import { Spinner } from './spinner';

export function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-4">
      <Spinner className="size-5" />
      <p>Loading...</p>
    </div>
  );
}
