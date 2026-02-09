import { Dependency } from '@resolver/dependency.ts'
import { define } from 'gunshi'

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
    const { identifier, compile, test } = ctx.values
    const dep = Dependency.from(identifier)
    console.log(dep.alias())
  }
})
