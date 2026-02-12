import fs from 'node:fs/promises'
import path from 'node:path'
import { Repository } from '@resolver/repository'
import { parse, stringify } from 'smol-toml'
import { ConfigSchema, type DukeConfig } from './schema'

export class Config {
  readonly path: string = path.join(process.cwd(), 'duke.toml')

  public async read(): Promise<DukeConfig> {
    try {
      const content = await fs.readFile(this.path)
      const toml = parse(content.toString())
      return await ConfigSchema.parseAsync(toml)
    } catch (_) {
      throw new Error('Error parsing config file!')
    }
  }

  public async write(conf: DukeConfig): Promise<void> {
    try {
      const toml = stringify(conf)
      await fs.writeFile(this.path, toml, 'utf-8')
    } catch (_) {
      throw new Error('Error writing config file!')
    }
  }

  public async getRepos(): Promise<Repository[]> {
    const conf = await this.read()
    const repos: Repository[] = []

    const central = new Repository(
      'maven-central',
      'https://repo1.maven.org/repo2'
    )

    if (conf.repositories) {
      for (const repo of conf.repositories) {
        repos.push(new Repository(repo.id, repo.url))
      }
    }

    return [central, ...repos]
  }
}
