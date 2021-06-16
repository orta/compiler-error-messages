import { scaffoldTemplate } from "../lib/scaffold.mjs";
import { md } from "../lib/md.mjs"
import { basename, join } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";

export const setupExamples = ({ cmd, args, env }) => {
  console.log(`\n\n--- ${env} ---\n`)

  return async function runExample(relativePath, configure) {
    const name = basename(relativePath, ".md")
    const fullPath = join(env, relativePath)
    console.log(" - " + fullPath)
    const mdData = md(fullPath)
    const projectDir = scaffoldTemplate(env, name, mdData.files)
    if (configure) configure(projectDir)
    const firstFile = Object.keys(mdData.files)[0]
    const consoleResults = await execToHTML(cmd, [...args, firstFile], { cwd: projectDir, })
    const htmlWrapper = `
${codify(mdData.blurb)}

${codify(consoleResults)}
  `
    writeFixture(join(env, name), htmlWrapper)
  }
}

export const codify = (str) => `<pre><code>
${str}
</code></pre>`
