import fs from 'node:fs'
import path from 'node:path'
import type { DukeConfig } from '@config/config'
import { Dependency } from '@resolver/dependency.ts'
import { define } from 'gunshi'
import { stringify } from 'smol-toml'

export const add = define({
  name: 'add',
  description: 'Add a dependency to the project',
  args: {
    identifier: {
      type: 'positional',
      description: 'The identifier of the dependency'
    },
    test: {
      type: 'boolean',
      short: 't',
      description: 'Add as test dependency',
      default: false
    }
  },
  run: async (ctx) => {
    const { identifier, test } = ctx.values
    const dep = Dependency.from(identifier)
    const config: DukeConfig = ctx.extensions.toml.config()

    const scope = test ? 'test' : 'compile'
    config[scope] ??= {}
    config[scope][dep.alias()] = dep.version

    try {
      const file = path.join(process.cwd(), 'duke.toml')
      fs.writeFileSync(file, stringify(config), 'utf-8')
    } catch (_) {
      throw new Error("Error writing to the configuration file!")
    }
  }
})
