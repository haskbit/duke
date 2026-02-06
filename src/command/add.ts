import { define } from 'gunshi'

export const add = define({
  name: 'add',
  description: 'Add a dependency to the project',
  args: {
    identifier: {
      type: 'positional',
      short: 'id',
      required: true
    },
    compile: {
      type: 'boolean',
      short: 'c',
      description: 'Add as compile dependency (default)',
      default: false
    },
    test: {
      type: 'boolean',
      short: 't',
      description: 'Add as test dependency',
      default: false
    }
  },
  run: async (ctx) => {
    console.log('Adding a new dependency')
  }
})
