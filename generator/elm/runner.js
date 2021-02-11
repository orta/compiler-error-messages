// @ts-check

import { join } from "path"
import { readdirSync } from "fs"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { codify, setupExamples } from "../lib/runExample.js";

const go = async () => {
  const html = await execToHTML("elm", ["--help"], {})
  writeFixture("elm/help", codify(html))

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "elm", args: ["make"], env: "elm" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
