import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: Error) {
  let errorMessage;

  if (isAxiosError(error)) errorMessage = error.response?.data?.message;
  else errorMessage = error.message;

  return errorMessage;
}

export function getInitials(name?: string) {
  if (!name) return 'U';

  const segments = name.trim().split(/\s+/).filter(Boolean);
  if (segments.length >= 2) {
    return `${segments[0][0]}${segments[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}
