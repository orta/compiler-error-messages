// @ts-check

import { basename } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { scaffoldTemplate } from "../lib/scaffold.mjs";
import { md } from "../lib/md.mjs";

const go = async () => {
  const html = await execToHTML("elm", ["--help"])
  writeFixture("elm/help", html)

  runExample("elm/errors/ambiguous-type-name.md")
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
