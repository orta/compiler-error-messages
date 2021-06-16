// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = await setupExamples({ cmd: "tsc", args: [], env: "tsc" })
  for (const file of mdFiles) {
   await runner(`errors/${file}`) 
  }
}

go()

export { }
