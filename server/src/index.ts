import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve as inngestServe } from 'inngest/hono';
import { inngest } from './inngest/client.js';
import { readmeToWebpage } from './inngest/functions.js';
import { authRoutes } from './routes/auth.js';
import { projectRoutes } from './routes/projects.js';

const app = new Hono().basePath('/api');

app.use(logger());
app.use(
  cors({
    origin: origin => {
      const clientUrl = process.env.CLIENT_URL!;
      const { host } = new URL(clientUrl);
      if (origin === clientUrl || origin.endsWith(`.${host}`)) {
        return origin;
      }
      return null;
    },
    credentials: true,
  }),
);
app.use('/inngest', inngestServe({ client: inngest, functions: [readmeToWebpage] }));

app.route('/auth', authRoutes);
app.route('/projects', projectRoutes);

app.get('/', c => c.text('Hello Hono!'));

serve({ fetch: app.fetch, port: 8888 }, info => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
