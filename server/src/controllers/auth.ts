import { eq } from 'drizzle-orm';
import type { Context } from 'hono';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';

export async function googleLogin(c: Context) {
  const user = c.get('user');
  if (!user) return c.json({ message: 'User not found in context' }, 400);

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user?.email))
    .limit(1);

  if (existingUser) return c.json({ message: 'User already exists' }, 201);

  const [newUser] = await db
    .insert(usersTable)
    .values({
      name: user?.name,
      email: user?.email,
      profilePicture: user?.profilePicture,
      authProviderId: user?.authProviderId,
    })
    .returning();

  return c.json({ message: 'Google login successful', success: true });
}
