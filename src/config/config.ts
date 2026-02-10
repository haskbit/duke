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
   * @property {Map<string, string> | undefined} - The compiled dependecies
   */
  compile: z.map(z.string(), z.string()).optional(),
  /**
   * Testing scoped dependencies
   * @property {Map<string, string> | undefined} - The testing dependecies
   */
  test: z.map(z.string(), z.string()).optional()
})

export type DukeConfig = z.infer<typeof ConfigSchema>
