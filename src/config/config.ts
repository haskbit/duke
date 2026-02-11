import z from 'zod'

export const ConfigSchema = z.object({
  /**
   * Project section
   * @property {string} name - The project name
   * @property {string} version - The project version
   * @property {string | undefined} author  - The project author
   */
  project: z.object({
    name: z.string(),
    version: z.string(),
    author: z.string().optional()
  }),
  /**
   * Compile scoped dependencies
   * @property {Record<string, string> | undefined} - The compiled dependencies
   */
  compile: z.record(z.string(), z.string()).optional(),
  /**
   * Testing scoped dependencies
   * @property {Record<string, string> | undefined} - The testing dependencies
   */
  test: z.record(z.string(), z.string()).optional(),
  /**
   * The current repositories for the scoped dependencies
   * @property {Array<{ id: string, url: string }>} - The repositories
   */
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
