import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve as inngestServe } from 'inngest/hono';
import { inngest } from './inngest/client.js';
import { analyzeReadmeFlow } from './inngest/functions.js';
import { authRoutes } from './routes/auth.js';
import { projectRoutes } from './routes/projects.js';

const app = new Hono().basePath('/api');

app.use(logger());
app.use(cors({ origin: process.env.CLIENT_URL!, credentials: true }));
app.use('/inngest', inngestServe({ client: inngest, functions: [analyzeReadmeFlow] }));

app.route('/auth', authRoutes);
app.route('/projects', projectRoutes);

app.get('/', c => c.text('Hello Hono!'));

serve({ fetch: app.fetch, port: 8888 }, info => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
