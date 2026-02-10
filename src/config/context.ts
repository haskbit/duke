import { ConfigSchema, type DukeConfig } from './config'
import { plugin } from 'gunshi/plugin'
import fs from 'node:fs'
import path from 'node:path'
import TOML from '@iarna/toml'

interface TomlPlugin {
  config: () => DukeConfig
}

export const toml = plugin({
  id: 'toml',
  extension: (): TomlPlugin => ({
    config: (): DukeConfig => {
      const file = path.join(process.cwd(), 'duke.toml')

      if (!fs.existsSync(file)) {
        throw new Error('duke.toml not found!')
      }

      try {
        const content = fs.readFileSync(file, 'utf-8')
        const conf = TOML.parse(content)
        return ConfigSchema.parse(conf)
      } catch (_) {
        throw new Error('Failed to parse duke.toml')
      }
    }
  })
})
