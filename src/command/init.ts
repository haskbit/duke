import fs from 'node:fs'
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
      description: 'Force a new empty project deleting existing files',
      required: false
    }
  },
  run: async (ctx) => {
    const { force } = ctx.values
    const cwd = process.cwd()

    if (force) {
      for (const file of fs.readdirSync(cwd)) {
        const filePath = path.join(cwd, file)
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }

    if (fs.readdirSync(cwd).length > 0) {
      throw new Error(
        'Directory not empty! Use force flag or create a new folder'
      )
    }

    const content = {
      project: {
        name: path.basename(cwd),
        version: '1.0.0'
      }
    }

    try {
      const toml = path.join(cwd, 'duke.toml')
      fs.writeFileSync(toml, stringify(content), 'utf-8')
    } catch (_) {
      throw new Error('Error creating toml file!')
    }
  }
})
