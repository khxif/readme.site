'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Loading } from '../components/ui/loading';
import { supabase } from '../supabase/client';

export function AuthProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      setLoading(true);

      const { data } = await supabase.auth.getSession();
      setLoading(false);
      
      if (!data.session) router.replace('/auth/login');
    }

    checkAuth();
  }, [router]);

  return loading ? <Loading /> : children;
}
