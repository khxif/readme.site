import { supabase } from '@/supabase/client';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) config.headers.Authorization = `Bearer ${session.access_token}`;

  return config;
});
