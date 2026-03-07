import { apiClient } from '@/lib/api-client';

export async function getProjects() {
  const { data } = await apiClient.get('/projects');
  return data.data;
}

export async function createProject(name: string) {
  const { data } = await apiClient.post('/projects', { name });
  return data;
}

export async function deleteProject(id: string) {
  const { data } = await apiClient.delete(`/projects/${id}`);
  return data;
}
