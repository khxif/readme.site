import { Hono } from 'hono';
import { googleLogin } from '../controllers/auth.js';
import { TryCatch } from '../lib/try-catch.js';

export const authRoutes = new Hono();

authRoutes.get('/login/google', TryCatch(googleLogin));
