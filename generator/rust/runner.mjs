// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { setupExamples } from "../lib/runExample.mjs";
import shelljs from "shelljs"

const go = async () => {

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "rustc", args: [], env: "rust" })
  
  for (const file of mdFiles) {
    await runner(`errors/${file}`) 
  }
}

go()

export { }
