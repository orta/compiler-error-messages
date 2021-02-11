// @ts-check

import { basename, join } from "path"
import { readdirSync } from "fs"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { scaffoldTemplate } from "../lib/scaffold.mjs";
import { md } from "../lib/md.mjs";

const go = async () => {
  const html = await execToHTML("elm", ["--help"])
  writeFixture("elm/help", html)

  const mdFiles = readdirSync(join(import.meta.url, "..", "errors").replace("file:", "")).filter(f => f.endsWith(".md"))
  mdFiles.forEach(file => runExample(`elm/errors/${file}`))
}

go()

async function runExample(relativePath) {
  const name = basename(relativePath, ".md")
  const mdData = md(relativePath)
  const project = scaffoldTemplate("elm", name, mdData.files)
  const firstFile = Object.keys(mdData.files)[0]
  const consoleResults = await execToHTML("elm", ["make", firstFile], { cwd: project, })

  const htmlWrapper = `
<p>${mdData.blurb}</p>

<pre><code>
${consoleResults}
</code></pre>
`
  writeFixture("elm/" + name, htmlWrapper)
}

export { }
