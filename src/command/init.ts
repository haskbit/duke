import fs from 'node:fs/promises'
import path from 'node:path'
import { define } from 'gunshi'
import { stringify } from 'smol-toml'

export const init = define({
  name: 'init',
  description: 'Initialize a new duke project',
  args: {
    force: {
      type: 'boolean',
      short: 'f',
      description: 'Force a new empty project',
      required: false
    }
  },
  run: async (ctx) => {
    const { force } = ctx.values
    const cwd = process.cwd()

    if (force) {
      for (const file of await fs.readdir(cwd)) {
        const filePath = path.join(cwd, file)
        await fs.rm(filePath, { recursive: true, force: true })
      }
    }

    const content = {
      project: {
        name: path.basename(cwd),
        version: '1.0.0'
      }
    }

    try {
      const toml = path.join(cwd, 'duke.toml')
      await fs.writeFile(toml, stringify(content), 'utf-8')
    } catch (_) {
      throw new Error('Error creating toml file!')
    }
  }
})
