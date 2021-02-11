import { existsSync, mkdirSync, writeFileSync } from "fs"
import { basename, join } from "path"

/**
 * @param name string
 * @param content string
 */
export function writeFixture (name, content) {
  const path = join(import.meta.url, "..", "..", "..", "output", name + ".html").replace("file:", "")
  const folder = path.replace(basename(path), "")
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true})   
  }
  writeFileSync(path, content)
}
