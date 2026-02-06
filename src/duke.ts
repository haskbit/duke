import { cli, define } from 'gunshi'
import { renderUsage } from 'gunshi/renderer'
import { add } from '@command/add.ts'
import { init } from '@command/init.ts'

const duke = define({
  run: async (ctx) => {
    const usage = await renderUsage(ctx)
    console.log(usage)
  }
})

await cli(process.argv.slice(2), duke, {
  name: 'duke',
  version: '0.0.1',
  subCommands: {
    add: add,
    init: init
  }
})
