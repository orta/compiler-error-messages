process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exitCode = 1
});

const filter = process.argv[2] || "*"

if (filter.startsWith("*") || filter.startsWith("elm")) {
  import("./elm/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("tsc")) {
  import("./tsc/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("rust")) {
  import("./rust/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("swift")) {
  import("./swift/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("rescript")) {
  import("./rescript/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("elixir")) {
  import("./elixir/runner.js")
}

if (filter.startsWith("*") || filter.startsWith("js")) {
  import("./js/runner.js")
}
