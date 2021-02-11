// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { setupExamples } from "../lib/runExample.js";

const go = async () => {
  const vanilla = await execToHTML("rustc", ["--help"], {})
  writeFixture("rust/help", vanilla)

  const codegen = await execToHTML("rustc", ["-C", "help"], {})
  writeFixture("rust/help-codegen", codegen)

  const lint = await execToHTML("rustc", ["-W", "help"], {})
  writeFixture("rust/help-lint-and-settings", lint)

  const all = await execToHTML("rustc", ["--help", "-v"], {})
  writeFixture("rust/help-all", all)

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  const runner = setupExamples({ cmd: "rustc", args: [], env: "rust" })
  mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
