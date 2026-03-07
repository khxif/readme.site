import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40">
        <FolderOpen className="size-7 text-muted-foreground/50" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-1.5 max-w-xs">
        <p className="text-sm font-semibold text-foreground">No projects yet</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Create your first project to start organizing your work.
        </p>
      </div>

      <Button onClick={onCreateClick} size="sm" className="gap-2">
        <Plus className="size-3.5" />
        New project
      </Button>
    </div>
  );
}
