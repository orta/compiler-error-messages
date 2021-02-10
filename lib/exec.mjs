// @ts-check

import pty  from 'node-pty';
import Convert from "ansi-to-html"

/**
 * @param cmd string
 * @param args string[]
 * @param opts {import("node-pty").IPtyForkOptions}
 */
export function execToHTML (cmd, args, opts) {
  return new Promise((done) => {
    const run = pty.spawn(cmd, args, opts)
    const converter = new Convert({})
    
    let html = ""
    let counter = 0
    run.onData(function (data) {
      // @ts-ignore
      // if (data.includes("\\033")) html = ""
      counter++
      console.log(counter, data)
      html += converter.toHtml(data)
    });

    run.onExit(() => {
      done(html)
    })
  })

}
