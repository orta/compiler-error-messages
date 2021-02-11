// @ts-check

import { join } from "path"
import { readdirSync } from "fs"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { setupExamples } from "../lib/runExample.js";

const go = async () => {
  const runner = setupExamples({ cmd: "swiftc", args: [], env: "swift" })
  
  const html = await execToHTML("swiftc", ["--help"], {})
  writeFixture("swift/help", html)

  // const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  // mdFiles.forEach(file => runner(`errors/${file}`))
}

go()

export { }
