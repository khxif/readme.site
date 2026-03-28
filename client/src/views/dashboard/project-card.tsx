'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent, MouseEvent } from 'react';

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
  const router = useRouter();
  const accent = getAccentColor(project.name);
  const initial = project.name.charAt(0).toUpperCase();
  const shortId = project.id.split('-')[0];
  const href = `${process.env.NEXT_PUBLIC_APP_URL}/${project.name}`;

  function handleNavigate() {
    router.push(href);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    handleNavigate();
  }

  function handleDelete(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onDelete(project.id);
  }

  return (
    <Card
      role="link"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${project.name}`}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-0 rounded-xl border border-border bg-card py-0',
        'shadow-xs transition-all duration-200 outline-none',
        'hover:-translate-y-0.5 hover:shadow-md',
        'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      <div className="h-1 w-full rounded-t-xl bg-linear-to-r from-primary/40 to-primary/10" />

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold',
              accent.bg,
              accent.text,
            )}
          >
            {initial}
          </div>

          <div className="flex items-center gap-1">
            <span className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground/70 transition-colors group-hover:text-foreground">
              <ArrowUpRight className="size-3.5" />
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
              onClick={handleDelete}
              aria-label={`Delete ${project.name}`}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold leading-tight text-foreground line-clamp-2">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground/60">
            <span>#{shortId}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="truncate">{href}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
