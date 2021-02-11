// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { setupExamples } from "../lib/runExample.js";

const go = async () => {
  const html = await execToHTML("tsc", ["--help"], {})
  writeFixture("tsc/help", html)

  const html2 = await execToHTML("tsc", ["--help", "--all"], {})
  writeFixture("tsc/help-all", html2)

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "tsc", args: [], env: "tsc" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
