import graymatter from "gray-matter"
import { join } from "path"

export function md(relativePath) {
  const path = join(import.meta.url, "..", "..", relativePath).replace("file:", "")

  try {
    const r = graymatter.read(path)
    
    const files = {}
    const codeblocks = r.content.split("```")
  
    for (let index = 1; index < codeblocks.length - 1; index++) {
      const codeblock = codeblocks[index];
      const [meta, ...content] = codeblock.split("\n")
      const filepath = meta.split(" ")[1]
      files[filepath] = content.join("\n")
    }
  
    return {
      data: r.data,
      blurb: codeblocks[0].trim(),
      files
    }
    
  } catch (error) {
    console.error("\n\nIn file: " + relativePath)
    throw error
  }
}
