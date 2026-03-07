import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  authProviderId: varchar('auth_provider_id', { length: 255 }).notNull().unique(),
  profilePicture: varchar('profile_picture', { length: 512 }),
});
