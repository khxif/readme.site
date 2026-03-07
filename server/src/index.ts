import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serve as inngestServe } from 'inngest/hono';
import { inngest } from './inngest/client.js';
import { analyzeReadmeFlow } from './inngest/functions.js';
import { authRoutes } from './routes/auth.js';

const app = new Hono().basePath('/api');

app.route('/auth', authRoutes);
app.use('/inngest', inngestServe({ client: inngest, functions: [analyzeReadmeFlow] }));

app.get('/', c => c.text('Hello Hono!'));

serve({ fetch: app.fetch, port: 8888 }, info => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
