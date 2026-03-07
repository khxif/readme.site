'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteProjectMutation } from '@/hooks/mutations';
import { useGetProjects } from '@/hooks/queries';
import { queryKeys } from '@/hooks/query-keys';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CreateProjectDialog } from './create-project-dialog';
import { DeleteProjectDialog } from './delete-dialog';
import { EmptyState } from './empty-state';
import { ProjectCard } from './project-card';

export function DashboardView() {
  const queryClient = useQueryClient();
  const { data: projects, isLoading, isError } = useGetProjects();

  const { mutateAsync, isPending } = useDeleteProjectMutation();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;
    await mutateAsync(deleteTargetId);

    await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    toast.success('Project deleted');
  }

  const hasProjects = Array.isArray(projects) && projects.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">Projects</h1>
              <p className="text-sm text-muted-foreground">Manage and organize your work</p>
            </div>

            <Button
              size="sm"
              onClick={() => setShowCreateDialog(true)}
              className="self-start gap-2 sm:self-auto"
            >
              <Plus className="size-3.5" />
              New project
            </Button>
          </div>

          <Separator />
        </div>

        {/* Content */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Spinner className="size-5 text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <p className="text-sm font-medium text-foreground">Something went wrong</p>
              <p className="text-sm text-muted-foreground">
                Failed to load your projects. Try refreshing the page.
              </p>
            </div>
          ) : !hasProjects ? (
            <EmptyState onCreateClick={() => setShowCreateDialog(true)} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={id => setDeleteTargetId(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateProjectDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />

      <DeleteProjectDialog
        open={deleteTargetId !== null}
        onOpenChange={open => {
          if (!open) setDeleteTargetId(null);
        }}
        onConfirm={handleDeleteConfirm}
        isPending={isPending}
      />
    </div>
  );
}
