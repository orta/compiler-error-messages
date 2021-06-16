import { scaffoldTemplate } from "../lib/scaffold.mjs";
import { md } from "../lib/md.mjs"
import { basename, join } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";

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

${codify(consoleResults)}
  `
    writeFixture(join(env, name), htmlWrapper)
  }
}

export const codify = (str) => `<pre><code>
${str}
</code></pre>`
