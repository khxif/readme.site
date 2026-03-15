import { eq } from 'drizzle-orm';
import type { Context } from 'hono';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { supabase } from '../supabase/client.js';

export async function googleLogin(c: Context) {
  const authHeader = c.req.header('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return c.json({ message: 'Missing authorization token' }, 401);

  const token = authHeader.split(' ')[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) return c.json({ message: 'Invalid or expired token' }, 401);

  if (!user.email) return c.json({ message: 'Email not provided by provider' }, 400);
  const email = user.email;

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (existingUser) return c.json({ message: 'User already exists' }, 200);

  const metadata = user.user_metadata 

  const [newUser] = await db
    .insert(usersTable)
    .values({
      name: metadata.full_name ?? metadata.name ?? null,
      email: email,
      profilePicture: metadata.avatar_url ?? null,
      authProviderId: metadata.provider_id,
    })
    .returning();

  return c.json({ message: 'Google login successful', success: true });
}
