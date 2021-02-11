// @ts-check

import pty  from 'node-pty';
import ansiHTML from 'ansi-html'


/**
 * @param cmd string
 * @param args string[]
 * @param opts {import("node-pty").IPtyForkOptions}
 */
export function execToHTML (cmd, args, opts) {
  return new Promise((done) => {
    /** @type {import("node-pty").IPtyForkOptions)} */
    const spawnOpts = {
      ...opts,
      // cols: 120
    }
    const run = pty.spawn(cmd, args, spawnOpts)
    let ansi = ""

    run.onData(function (data) {
      const elmMessages = ["Compiling ...", "Verifying dependencies", "Dependencies ready", "Detected problems in"]
      const tscMessages = ["yarn run v", "[2K[2K[1G"]
      const skipIncludes = [...elmMessages, ...tscMessages]
      const included = skipIncludes.find(si => data.includes(si))
      if (!included) {
        ansi += data
      }
    });

    run.onExit(() => {
      // debugger
      // @ts-ignore
      const html = ansiHTML(ansi)
      // console.log({ html, ansi })
      done(html)
    })
  })

}