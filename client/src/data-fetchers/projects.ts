import { apiClient } from '@/lib/api-client';
import { CreateProjectSchemaType } from '@/zod-schemas/project';

export async function getProjects() {
  const { data } = await apiClient.get<ApiResponse<Project[]>>('/projects');
  return data.data;
}

export async function getProjectByName(name: string) {
  const { data } = await apiClient.get<ApiResponse<Project>>(`/projects/${name}`);
  return data.data;
}

export async function createProject(body: CreateProjectSchemaType) {
  const { data } = await apiClient.post<ApiResponse<void>>('/projects', body);
  return data;
}

export async function deleteProject(id: string) {
  const { data } = await apiClient.delete<ApiResponse<void>>(`/projects/${id}`);
  return data;
}
