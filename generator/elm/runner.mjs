// @ts-check

import { join } from "path"
import { readdirSync } from "fs"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  const html = await execToHTML("elm", ["--help"], {})
  writeFixture("elm/help", codify(html))

  const make = await execToHTML("elm", ["make", "--help"], {})
  writeFixture("elm/help-make", codify(make))

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "elm", args: ["make"], env: "elm" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
