import { apiClient } from '@/lib/api-client';

export async function googleLogin() {
  const { data } = await apiClient.post('/auth/login/google');
  return data;
}
