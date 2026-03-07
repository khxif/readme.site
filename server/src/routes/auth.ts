import { Hono } from 'hono';
import { googleLogin } from '../controllers/auth.js';
import { TryCatch } from '../lib/try-catch.js';
import { verifyAuth } from '../middlewares/verify-auth.js';

export const authRoutes = new Hono();

authRoutes.post('/login/google', verifyAuth, TryCatch(googleLogin));
