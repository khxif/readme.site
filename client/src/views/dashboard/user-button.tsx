'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/supabase/client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function getInitials(nameOrEmail?: string) {
  if (!nameOrEmail) return 'U';

  const segments = nameOrEmail.trim().split(/\s+/).filter(Boolean);
  if (segments.length >= 2) {
    return `${segments[0][0]}${segments[1][0]}`.toUpperCase();
  }

  return nameOrEmail.slice(0, 2).toUpperCase();
}

export function UserButton() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;

      const user = data.user;
      const metadata = user?.user_metadata;
      const name = metadata?.full_name ?? metadata?.name;

      setDisplayName(typeof name === 'string' ? name : undefined);
      setEmail(user?.email);
      setAvatarUrl(typeof metadata?.avatar_url === 'string' ? metadata.avatar_url : undefined);
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/auth/login');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-full"
          aria-label="Open user menu"
        >
          <Avatar size="lg">
            <AvatarImage src={avatarUrl} alt={displayName ?? email ?? 'User avatar'} />
            <AvatarFallback>{getInitials(displayName ?? email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-0.5">
          <p className="truncate text-sm font-medium text-foreground">{displayName || 'User'}</p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {email || 'No email'}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
