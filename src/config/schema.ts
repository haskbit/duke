import z from 'zod'

export const ConfigSchema = z.object({
  project: z.object({
    name: z.string(),
    version: z.string(),
    author: z.string().optional()
  }),
  compile: z.map(z.string(), z.string()).optional(),
  test: z.map(z.string(), z.string()).optional(),
  repositories: z
    .array(
      z.object({
        id: z.string(),
        url: z.string()
      })
    )
    .optional()
})

export type DukeConfig = z.infer<typeof ConfigSchema>
