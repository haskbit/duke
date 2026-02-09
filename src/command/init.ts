import fs from 'node:fs'
import path from 'node:path'
import { define } from 'gunshi'

export const init = define({
  name: 'init',
  description: 'Initialize a new duke project',
  args: {
    force: {
      type: 'boolean',
      short: 'f',
      description: 'Force a new empty project deleting existing files',
      required: false
    }
  },
  run: async (ctx) => {
    const { force } = ctx.values
    const cwd = process.cwd()

    if (force) {
      if (!fs.statSync(cwd).isDirectory()) {
        throw new Error('Path is not a directory!')
      }

      const files = fs.readdirSync(cwd)
      for (const file of files) {
        const filePath = path.join(cwd, file)
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }

    try {
      const toml = path.join(cwd, 'duke.toml')
      // TODO: add initial content
      fs.writeFileSync(toml, '')
    } catch (_) {
      throw new Error('Error creating toml file!')
    }
  }
})
