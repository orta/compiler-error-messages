import { scaffoldTemplate } from "../lib/scaffold.js";
import { md } from "../lib/md.js"
import { basename, join } from "path"
import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";

export const setupExamples = ({ cmd, args, env }) => {
  console.log(`\n\n--- ${env} ---\n`)

  return async function runExample(relativePath) {
    const name = basename(relativePath, ".md")
    console.log(" - " + relativePath)
    const mdData = md(join(env, relativePath))
    const project = scaffoldTemplate(env, name, mdData.files)
    const firstFile = Object.keys(mdData.files)[0]
    const consoleResults = await execToHTML(cmd, [...args, firstFile], { cwd: project, })
  
    const htmlWrapper = `
<p>${mdData.blurb}</p>

<pre><code>
${consoleResults}
</code></pre>
  `
    writeFixture(join(env, name), htmlWrapper)
  }
}
