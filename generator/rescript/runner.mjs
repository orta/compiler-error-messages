// @ts-check

import { readdirSync } from "fs"
import { join } from "path"
import { execToHTML } from "../lib/exec.mjs";
import { writeFixture } from "../lib/write.mjs";
import { codify, setupExamples } from "../lib/runExample.mjs";

const go = async () => {
  const runner = setupExamples({ cmd: "bsb", args: [], env: "rescript" })
}

go()

export { }
