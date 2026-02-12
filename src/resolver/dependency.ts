export enum Scope {
  Compile = 'compile',
  Test = 'test'
}

export class Dependency {
  groupId: string
  artifactId: string
  version: string
  scope: Scope

  constructor(groupId: string, artifactId: string, version: string) {
    this.groupId = groupId
    this.artifactId = artifactId
    this.version = version
    this.scope = Scope.Compile
  }

  public alias(): string {
    const parts = this.groupId.split('.')

    if (parts.length < 2) {
      throw new Error(
        `Invalid groupId format: "${this.groupId}". Expected at least 2 parts`
      )
    }

    const domain = parts.reverse().slice(-2).join('.')
    return `${domain}/${this.artifactId}`
  }

  public static from(identifier: string): Dependency {
    const parts = identifier.split(':')

    if (parts.length !== 3) {
      throw new Error(
        `Invalid identifier format! Use: groud.id:artifact:version`
      )
    }

    const [groupId, artifactId, version] = parts

    if (!groupId || !artifactId || !version) {
      throw new Error(
        `Invalid identifier: all parts must be non-empty! Got: '${identifier}'`
      )
    }

    return new Dependency(groupId, artifactId, version)
  }
}
