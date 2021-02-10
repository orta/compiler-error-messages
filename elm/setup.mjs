// @ts-check
import shelljs from "shelljs"

if (!shelljs.which("elm")) {
  throw new Error("Elm is not installed")
}

