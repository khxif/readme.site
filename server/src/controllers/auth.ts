import { eq } from 'drizzle-orm';
import type { Context } from 'hono';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';

export async function googleLogin(c: Context) {
  const { name, email, profilePicture, authProviderId } = await c.req.json();
  if (!name || !email || !authProviderId) return c.json({ error: 'Missing required fields' }, 400);

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser) return c.json({ success: true, message: 'User already exists' });

  const [newUser] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      profilePicture,
      authProviderId,
    })
    .returning();

  return c.json({ message: 'Google login successful', success: true });
}
