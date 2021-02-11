// @ts-check

import { readdirSync } from "fs"
import { basename, join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { scaffoldTemplate } from "../lib/scaffold.js";
import { md } from "../lib/md.js";

const go = async () => {
  const html = await execToHTML("tsc", ["--help"], {})
  writeFixture("tsc/help", html)

  const html2 = await execToHTML("tsc", ["--help", "--all"], {})
  writeFixture("tsc/help-all", html2)

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  mdFiles.forEach(file => runExample(`tsc/errors/${file}`))
}

go()

async function runExample(relativePath) {
  const name = basename(relativePath, ".md")
  const mdData = md(relativePath)
  const project = scaffoldTemplate("tsc", name, mdData.files)

  const firstFile = Object.keys(mdData.files)[0]
  const consoleResults = await execToHTML("tsc", [firstFile], { cwd: project })

  const htmlWrapper = `
<p>${mdData.blurb}</p>

<pre><code>
${consoleResults}
</code></pre>
`
  writeFixture("tsc/" + name, htmlWrapper)
}

export { }
