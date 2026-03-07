import { Hono } from 'hono';
import { TryCatch } from '../lib/try-catch.js';
import { createProject, deleteProject, getProjects } from '../controllers/projects.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const projectRoutes = new Hono().basePath('/projects');

projectRoutes.get('/', verifyAuth, TryCatch(getProjects));
projectRoutes.post('/', verifyAuth, TryCatch(createProject));
projectRoutes.delete('/:id', verifyAuth, TryCatch(deleteProject));
