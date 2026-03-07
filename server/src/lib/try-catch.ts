import { type Context } from 'hono';

type Controller = (c: Context) => Promise<Response>;

export function TryCatch(controller: Controller) {
  return async (c: Context) => {
    try {
      return await controller(c);
    } catch (error) {
      console.error('Error:', error);
      return c.json({ success: false, message: 'Internal Server Error' }, 500);
    }
  };
}
