// @ts-check

import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  setupExamples({ cmd: "help", args: [], env: "help" })
  
  await execToFixture("yarn", ["jest", "--help"], "js/help-jest")
  await execToFixture("yarn", ["rome", "--help"], "js/help-rome")
  await execToFixture("yarn", ["prettier", "--help"], "js/help-prettier")
  await execToFixture("yarn", ["danger", "--help"], "js/help-danger")
  await execToFixture("yarn", ["flow", "--help"], "js/help-flow")
  await execToFixture("gh", ["--help"], "js/help-ghcli")

  const html = await execToHTML("tsc", ["--help"], {})
  writeFixture("tsc/help", codify(html))

  const all = await execToHTML("tsc", ["--help", "--all"], {})
  writeFixture("tsc/help-all", codify(all))

  const vanilla = await execToHTML("rustc", ["--help"], {})
  writeFixture("rust/help", codify(vanilla))

  const codegen = await execToHTML("rustc", ["-C", "help"], {})
  writeFixture("rust/help-codegen", codify(codegen))

  const lint = await execToHTML("rustc", ["-W", "help"], {})
  writeFixture("rust/help-lint-and-settings", codify(lint))

  const rustAll = await execToHTML("rustc", ["--help", "-v"], {})
  writeFixture("rust/help-all", codify(rustAll))

  const elixirHelp = await execToHTML("elixir", ["--help"], {})
  writeFixture("elixir/help", codify(elixirHelp))

  const elm = await execToHTML("elm", ["--help"], {})
  writeFixture("elm/help", codify(elm))

  const elmMake = await execToHTML("elm", ["make", "--help"], {})
  writeFixture("elm/help-make", codify(elmMake))

  const rescript = await execToHTML("bsb", ["--help"], {})
  writeFixture("rescript/help", codify(rescript))

  const swift = await execToHTML("swiftc", ["--help"], {})
  writeFixture("swift/help", codify(swift))

}

const execToFixture = async (cmd, args, template) => {
  const vanilla = await execToHTML(cmd, args, {})
  writeFixture(template, codify(vanilla))
}

go()

export { }
