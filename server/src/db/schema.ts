import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  authProviderId: varchar('auth_provider_id', { length: 255 }).notNull().unique(),
  profilePicture: varchar('profile_picture', { length: 512 }),
});

export const projectsTable = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  githubUrl: varchar('github_url', { length: 512 }).notNull(),
  createdBy: uuid('created_by').notNull().references(() => usersTable.id),
});
