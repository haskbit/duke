import fs from 'node:fs'
import path from 'node:path'
import { init } from '@command/init'
import { plugin } from 'gunshi/plugin'
import { parse } from 'smol-toml'
import { ConfigSchema, type DukeConfig } from './config'

interface TomlPlugin {
  config: () => DukeConfig
}

export const toml = plugin({
  id: 'toml',
  extension: (ctx): TomlPlugin => ({
    config: (): DukeConfig => {
      const file = path.join(process.cwd(), 'duke.toml')
      if (!fs.existsSync(file)) init.run(ctx)

      try {
        const content = fs.readFileSync(file, 'utf-8')
        const conf = parse(content)
        return ConfigSchema.parse(conf)
      } catch (_) {
        throw new Error('Failed to parse duke.toml')
      }
    }
  })
})
