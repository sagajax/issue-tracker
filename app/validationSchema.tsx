import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'Title is too small').max(255),
    description: z.string().min(1, 'Description is too small').max(65535),
})

export const patchIssueSchema = z.object({
    title: z
    .string()
    .min(1, 'Title is too small')
    .max(255)
    .optional(),
    description: z
    .string()
    .min(1, 'Description is too small')
    .max(65535)
    .optional(),
    assignedToUserId:z
    .string()
    .min(1, 'Assignee is too small')
    .max(255)
    .optional()
    .nullable(),


})
