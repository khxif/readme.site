import { createMiddleware } from 'hono/factory';
import { supabase } from '../supabase/client.js';

type Variables = {
  user: any;
};

export const verifyAuth = createMiddleware<{ Variables: Variables }>(async (c, next) => {
  const authHeader = c.req.header('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return c.json({ message: 'Missing authorization token' }, 401);

  const token = authHeader.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return c.json({ message: 'Invalid or expired token' }, 401);

  c.set('user', data.user);

  await next();
});
