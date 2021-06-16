process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
  process.exitCode = 1
});

const filter = process.argv[2] || "*"

if (filter.startsWith("*") || filter.startsWith("elm")) {
  import("./elm/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("tsc")) {
  import("./tsc/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("rust")) {
  import("./rust/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("swift")) {
  import("./swift/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("rescript")) {
  import("./rescript/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("elixir")) {
  import("./elixir/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("help")) {
  import("./help/runner.mjs")
}

if (filter.startsWith("*") || filter.startsWith("flow")) {
  import("./flow/runner.mjs")
}