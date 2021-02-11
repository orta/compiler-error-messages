// @ts-check

import { join } from "path"
import shelljs from "shelljs";
import { existsSync, writeFileSync } from "fs";

export function scaffoldTemplate (template, name, files) {
  const tmpDir = shelljs.tempdir()
  const templates = join(import.meta.url, "..", "..", "templates", template).replace("file:", "")
  const to = join(tmpDir, name)

  if (existsSync(to)) shelljs.rm("-r", to)
  shelljs.cp("-r", templates, to)
  
  Object.keys(files).forEach(f => {
    writeFileSync(join(to, f), files[f])
  })

  return to
}
