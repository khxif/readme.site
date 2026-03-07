import { apiClient } from '@/lib/api-client';

export async function googleLogin(user: User) {
  const { data } = await apiClient.post('/auth/login/google', user);
  return data;
}
