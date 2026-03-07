import { eq } from 'drizzle-orm';
import type { Context } from 'hono';
import { db } from '../db/index.js';
import { projectsTable } from '../db/schema.js';
import { inngest } from '../inngest/client.js';

export async function getProjects(c: Context) {
  const user = c.get('user');

  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.createdBy, user.id));

  return c.json({ data: projects });
}

export async function createProject(c: Context) {
  const user = c.get('user');

  const { name, githubUrl } = await c.req.json();
  if (!name || !githubUrl) return c.json({ message: 'Project name is required' }, 400);

  const [project] = await db
    .insert(projectsTable)
    .values({ name, githubUrl, createdBy: user.id })
    .returning();

  await inngest.send({
    name: 'readme/analyze',
    data: {
      githubUrl,
    },
  });

  return c.json({ message: 'Project Created Sucessfully!' }, 201);
}

export async function deleteProject(c: Context) {
  const user = c.get('user');

  const { id } = c.req.param();
  if (!id) return c.json({ message: 'Project Id not found!' }, 201);

  const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, id)).limit(1);
  if (!project || project.createdBy !== user.id)
    return c.json({ message: 'Project not found' }, 404);

  await db.delete(projectsTable).where(eq(projectsTable.id, id));

  return c.json({ message: 'Project deleted successfully' }, 201);
}
