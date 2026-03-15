'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useCreateProjectMutation } from '@/hooks/mutations';
import { queryKeys } from '@/hooks/query-keys';
import { createProjectSchema, CreateProjectSchemaType } from '@/zod-schemas/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useCreateProjectMutation();

  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      githubUrl: '',
    },
  });

  async function handleSubmit(values: CreateProjectSchemaType) {
    await mutateAsync(values);
    onOpenChange(false);
    router.push(`/${values.name}`);

    await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    toast.success('Project created');
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">New project</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5 pt-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. My awesome project"
                      autoFocus
                      autoComplete="off"
                      disabled={isPending}
                      className="h-9"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. https://github.com/user/repo"
                      autoComplete="off"
                      disabled={isPending}
                      className="h-9"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={isPending} className="min-w-[80px]">
                {isPending ? <Spinner className="size-3.5 text-white" /> : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
