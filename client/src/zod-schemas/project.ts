import z from 'zod';

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .regex(/^\S+$/, 'Spaces are not allowed in project name'),
  githubUrl: z.string().url('Must be a valid URL'),
});
export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;
