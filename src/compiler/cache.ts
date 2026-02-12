import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export enum CacheKind {
  Global,
  Local
}

export class Cache {
  path: string
  kind: CacheKind

  constructor(kind: CacheKind) {
    this.kind = this.resolveKind(kind)
    this.path = this.resolvePath(this.kind)
  }

  private resolveKind(requested: CacheKind): CacheKind {
    if (requested === CacheKind.Local) return CacheKind.Local
    return os.homedir() ? CacheKind.Global : CacheKind.Local
  }

  private resolvePath(kind: CacheKind): string {
    if (kind === CacheKind.Global) return path.join(os.homedir(), '.duke')
    return path.join(process.cwd(), 'modules')
  }

  public append(dep: string): void {}

  public remove(dep: string): void {}

  public async clean(): Promise<void> {
    if (!(await fs.exists(this.path))) return
    const files = await fs.readdir(this.path)

    for (const file of files.filter((f) => !f.endsWith('.toml'))) {
      const filePath = path.join(this.path, file)
      await fs.rm(filePath, { recursive: true, force: true })
    }
  }
}
