// @ts-check

import { join } from "path"
import shelljs from "shelljs";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export function scaffoldTemplate (template, name, files) {
  const tmpDir = shelljs.tempdir()
  const templates = join(import.meta.url, "..", "..", "templates", template).replace("file:", "")
  const to = join(tmpDir, template, name)

  if (existsSync(to)) shelljs.rm("-r", to)
  else mkdirSync(to, { recursive: true })

  if (existsSync(templates)) shelljs.cp("-r", templates, to)
  
  Object.keys(files).forEach(f => {
    writeFileSync(join(to, f), files[f])
  })

  return to
}
