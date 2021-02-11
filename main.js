const filter = process.argv[2] || "*"

if (filter.startsWith("*") || filter.startsWith("elm")) {
  import("./elm/setup.js")
  import("./elm/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("tsc")) {
  import("./tsc/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("rust")) {
  import("./rust/runner.js")
}
