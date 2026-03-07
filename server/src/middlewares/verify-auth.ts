import { eq } from 'drizzle-orm';
import { createMiddleware } from 'hono/factory';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { supabase } from '../supabase/client.js';

type Variables = {
  user: typeof usersTable.$inferSelect;
};

export const verifyAuth = createMiddleware<{ Variables: Variables }>(async (c, next) => {
  const authHeader = c.req.header('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return c.json({ message: 'Missing authorization token' }, 401);

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return c.json({ message: 'Invalid or expired token' }, 401);

  const [dbUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.authProviderId, data.user.id))
    .limit(1);

  if (!dbUser) return c.json({ message: 'User not found' }, 401);
  c.set('user', dbUser);

  await next();
});
