// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { setupExamples } from "../lib/runExample.mjs";
import shelljs from "shelljs"

const go = async () => {

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "yarn", args: ["flow"], env: "flow" })
  
  const linkNodeModules = (path) => {
    const ourNodeMods = join(import.meta.url, "..", "..", "..", "node_modules").replace("file:/", "/")
    shelljs.ln("-s", ourNodeMods, join(path, "node_modules"))
  }

  
  for (const file of mdFiles) {
   await runner(`errors/${file}`, linkNodeModules) 
  }

  
}

go()

export { }
