import { and, eq } from 'drizzle-orm';
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

export async function getProjectByName(c: Context) {
  const { name } = c.req.param();
  if (!name) return c.json({ message: 'Project Id not found!' }, 201);

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.name, name))
    .limit(1);

  if (!project) return c.json({ message: 'Project not found' }, 404);

  return c.json({ data: project });
}

export async function createProject(c: Context) {
  const user = c.get('user');
  if (user?.projects?.length >= 1) {
    return c.json(
      { message: 'You can only create one project for now. Pro plan coming soon!' },
      400,
    );
  }

  const { name, githubUrl } = await c.req.json();
  if (!name || !githubUrl) return c.json({ message: 'Project name is required' }, 400);

  const [existingProject] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.name, name))
    .limit(1);
  if (existingProject) return c.json({ message: 'Project with this name already exists' }, 400);

  const [project] = await db
    .insert(projectsTable)
    .values({ name, githubUrl, createdBy: user.id, status: 'PENDING' })
    .returning();

  await inngest.send({
    name: 'readme/generate',
    data: { projectId: project.id, githubUrl },
  });

  return c.json({ message: 'Project Created Successfully!' }, 201);
}

export async function deleteProject(c: Context) {
  const user = c.get('user');

  const { id } = c.req.param();
  if (!id) return c.json({ message: 'Project Id not found!' }, 201);

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(and(eq(projectsTable.id, id), eq(projectsTable.createdBy, user.id)))
    .limit(1);
  if (!project) return c.json({ message: 'Project not found' }, 404);

  await db.delete(projectsTable).where(eq(projectsTable.id, id));

  return c.json({ message: 'Project deleted successfully' }, 201);
}
