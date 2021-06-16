// @ts-check

import { join } from "path"
import { readdirSync } from "fs"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  setupExamples({ cmd: "elixir", args: [], env: "elixir" })

  const html = await execToHTML("elixir", ["--help"], {})
  writeFixture("elixir/help", codify(html))

  // const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  // mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
