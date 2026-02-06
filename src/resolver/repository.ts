import type { Dependency } from '@resolver/dependency.ts'

export class Repository {
  id: string
  url: string

  constructor(id: string, url: string) {
    this.id = id
    this.url = url
  }

  public async download(dep: Dependency): Promise<string | null> {
    return Promise.resolve(this.url)
  }
}
