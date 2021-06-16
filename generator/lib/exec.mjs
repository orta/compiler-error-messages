// @ts-check

import pty  from 'node-pty';
import { join } from 'path';
import shelljs from "shelljs"

import { writeFixture } from './write.mjs';

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
      cols: 90,
    }
    const run = pty.spawn(cmd, args, spawnOpts)
    let ansi = ""

    run.onData(function (data) {
      const elmMessages = ["Compiling ...", "Verifying dependencies", "Dependencies ready", "Detected problems in"]
      const tscMessages = ["yarn run v", "[2K[2K[1G"]
      const flowMessages = ["Launching Flow server", "Spawned flow server", "Logs will go to", "Monitor logs will", "Started a new flow", "Please wait. Server"]

      const skipIncludes = [...elmMessages, ...tscMessages, ...flowMessages]
      const included = skipIncludes.find(si => data.includes(si))
      if (!included) {
        ansi += data
      }
    });

    run.onExit(() => {
      const rawPath = "raw/" + cmd + "-" + args.join("-")
      writeFixture(rawPath, ansi)

      const fullRaw = join(import.meta.url, "..", "..", "..", "output", rawPath + ".html").replace("file:", "")
      const html = shelljs.cat(fullRaw).exec("ansi2html -i", { silent: true })
      
      done(html)
    })
  })

}
