import { Hono } from 'hono';
import { createProject, deleteProject, getProjectByName, getProjects } from '../controllers/projects.js';
import { TryCatch } from '../lib/try-catch.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const projectRoutes = new Hono();

projectRoutes.get('/', verifyAuth, TryCatch(getProjects));
projectRoutes.get('/:name', TryCatch(getProjectByName));
projectRoutes.post('/', verifyAuth, TryCatch(createProject));
projectRoutes.delete('/:id', verifyAuth, TryCatch(deleteProject));
