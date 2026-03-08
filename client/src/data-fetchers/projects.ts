import { apiClient } from '@/lib/api-client';
import { CreateProjectSchemaType } from '@/zod-schemas/project';

export async function getProjects() {
  const { data } = await apiClient.get('/projects');
  return data.data;
}

export async function getProjectByName(name:string) {
  const { data } = await apiClient.get(`/projects/${name}`);
  return data.data;
}

export async function createProject(body: CreateProjectSchemaType) {
  const { data } = await apiClient.post('/projects', body);
  return data;
}

export async function deleteProject(id: string) {
  const { data } = await apiClient.delete(`/projects/${id}`);
  return data;
}
