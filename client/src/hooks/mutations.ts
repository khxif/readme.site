import { googleLogin } from '@/data-fetchers/auth';
import { createProject, deleteProject } from '@/data-fetchers/projects';
import { useMutation } from '@tanstack/react-query';

export function useGoogleLoginMutation() {
  return useMutation({ mutationFn: googleLogin });
}

export function useCreateProjectMutation() {
  return useMutation({ mutationFn: createProject });
}

export function useDeleteProjectMutation() {
  return useMutation({ mutationFn: deleteProject });
}
