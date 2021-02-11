// @ts-check

import { execToHTML } from "../lib/exec.js";
import { writeFixture } from "../lib/write.js";
import { codify, setupExamples } from "../lib/runExample.js";

const go = async () => {
  setupExamples({ cmd: "js", args: [], env: "js" })
  
  execToFixture("yarn", ["jest", "--help"], "js/help-jest")
  execToFixture("yarn", ["rome", "--help"], "js/help-rome")
  execToFixture("yarn", ["prettier", "--help"], "js/help-prettier")
  execToFixture("yarn", ["danger", "--help"], "js/help-danger")
  execToFixture("gh", ["--help"], "js/help-ghcli")
}

const execToFixture = async (cmd, args, template) => {
  const vanilla = await execToHTML(cmd, args, {})
  writeFixture(template, codify(vanilla))
}

go()

export { }
