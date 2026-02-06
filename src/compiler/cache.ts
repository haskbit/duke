import type { Dependency } from '@resolver/dependency.ts'

export class Cache {
  path: string
  kind: 'global' | 'local'

  constructor(path: string, kind: 'global' | 'local') {
    this.path = path
    this.kind = 'global'
  }

  public append(dep: Dependency): Promise<void> {
    return Promise.resolve()
  }

  public remove(dep: Dependency): Promise<void> {
    return Promise.resolve()
  }

  public clean(): Promise<void> {
    return Promise.resolve()
  }
}
