import { AuthProtected } from '@/providers/auth-protected';
import * as React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthProtected>{children}</AuthProtected>;
}
