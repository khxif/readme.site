'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  createdBy: string;
}

const ACCENT_COLORS = [
  { bg: 'bg-violet-100', text: 'text-violet-700' },
  { bg: 'bg-sky-100', text: 'text-sky-700' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-rose-100', text: 'text-rose-700' },
  { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { bg: 'bg-teal-100', text: 'text-teal-700' },
  { bg: 'bg-orange-100', text: 'text-orange-700' },
] as const;

function getAccentColor(name: string) {
  return ACCENT_COLORS[name.charCodeAt(0) % ACCENT_COLORS.length];
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const accent = getAccentColor(project.name);
  const initial = project.name.charAt(0).toUpperCase();
  const shortId = project.id.split('-')[0];

  return (
    <Card
      className={cn(
        'group relative flex flex-col gap-0 rounded-xl border border-border bg-card py-0',
        'shadow-xs transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
      )}
    >
      {/* Top accent strip */}
      <div className="h-1 w-full rounded-t-xl bg-linear-to-r from-primary/40 to-primary/10" />

      <div className="flex flex-col gap-4 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Initial badge */}
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold',
              accent.bg,
              accent.text,
            )}
          >
            {initial}
          </div>

          {/* Delete button — visible on hover */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(project.id)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>

        {/* Project name */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
            {project.name}
          </h3>
          <p className="font-mono text-xs text-muted-foreground/60">
            #{shortId}
          </p>
        </div>
      </div>
    </Card>
  );
}
