// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  const vanilla = await execToHTML("rustc", ["--help"], {})
  writeFixture("rust/help", codify(vanilla))

  const codegen = await execToHTML("rustc", ["-C", "help"], {})
  writeFixture("rust/help-codegen", codify(codegen))

  const lint = await execToHTML("rustc", ["-W", "help"], {})
  writeFixture("rust/help-lint-and-settings", codify(lint))

  const all = await execToHTML("rustc", ["--help", "-v"], {})
  writeFixture("rust/help-all", codify(all))

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "rustc", args: [], env: "rust" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
