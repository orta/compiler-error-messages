// @ts-check

import { readdirSync } from "fs"
import { basename, join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { scaffoldTemplate } from "../lib/scaffold.js";
import { md } from "../lib/md.js";

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
  mdFiles.forEach(file => runExample(`rust/errors/${file}`))
}

go()

async function runExample(relativePath) {
  const name = basename(relativePath, ".md")
  const mdData = md(relativePath)
  const project = scaffoldTemplate("rust", name, mdData.files)

  const firstFile = Object.keys(mdData.files)[0]
  const consoleResults = await execToHTML("rustc", [firstFile], { cwd: project })

  const htmlWrapper = `
<p>${mdData.blurb}</p>

<pre><code>
${consoleResults}
</code></pre>
`
  writeFixture("rust/" + name, htmlWrapper)
}

export { }
