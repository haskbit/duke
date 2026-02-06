export class Dependency {
  groupId: string
  artifactId: string
  version: string

  constructor(groupId: string, artifactId: string, version: string) {
    this.groupId = groupId
    this.artifactId = artifactId
    this.version = version
  }

  public alias(): string {
    return 'todo'
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
