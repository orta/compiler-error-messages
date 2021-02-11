// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { codify, setupExamples } from "../lib/runExample.js";

const go = async () => {
  const html = await execToHTML("tsc", ["--help"], {})
  writeFixture("tsc/help", codify(html))

  const all = await execToHTML("tsc", ["--help", "--all"], {})
  writeFixture("tsc/help-all", codify(all))

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "tsc", args: [], env: "tsc" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
