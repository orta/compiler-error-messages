// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  const runner = setupExamples({ cmd: "bsb", args: [], env: "rescript" })
  const vanilla = await execToHTML("bsb", ["--help"], {})
  writeFixture("rescript/help", codify(vanilla))

  // const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  // mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
