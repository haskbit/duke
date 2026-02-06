import { define } from 'gunshi'

export const init = define({
  name: 'init',
  description: 'Initialize a new duke project',
  args: {
    path: {
      type: 'string',
      short: 'p',
      description: 'The directory to create the project',
      required: false
    },
    force: {
      type: 'boolean',
      short: 'f',
      description: 'Force a new empty project deleting existing files',
      required: false
    }
  },
  run: async (ctx) => {
    const { path, force } = ctx.values
    console.log('Initializing duke project')
  }
})
