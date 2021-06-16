---
layout: vanilla
title: Help prompts for different compilers
lang: rust
tags: ["conflicts", "imports"]
---

# Help on the CLI

The `--help` on a CLI is often one of the first places someone looks for info after their first install.

With a help command you have basically two goals; show the breadth of options and provide info on the set of of useful sub-commands. What seems to be really tricky is that the info in these commands can get very horizontally long and the heirarchy of that information can get a bit muddied.

For a long description, you can safely rely on a terminal wrapping your text, but its unlikely that it's going to work well with any left-edge formatting without considerable work. We see a few different ways to align the tabular form of this kind of data. For these examples, I mock out the width of the terminal at 90 chars, which should be the same width as the code samples below.

It looks like generally a help prompts from compilers avoids using colour too much. I think `elm` does quite a good job of both color and personality, which is something I've seen pretty consistently throughout the errors too.

### TypeScript

{% example "tsc/help" %}

There's a lot of tsconfig flags (and some more which are just for the CLI) so the TypeScript CLI includes a  version which lists all possible flags:

{% example "tsc/help-all" %}

### Elixir

{% example "elixir/help" %}

### Elm

Cool use of color (all the commands are blue, the 'read more' banner at the top is greyed out somewhat) and a pretty strong hierarchy of information.

{% example "elm/help" %}

Given that most of the work happens in a sub-commands, here's `elm  make --help`:

{% example "elm/help-make" %}

### Rust

{% example "rust/help" %}

I found Rust's help a little confusing at first, because I though there was a sense of hierarchy in how the options were presented. E.g. `-l` has a series of related flags like `--crate-type` because visually it tabs across. This isn't true, there is just a consistent whitespace for single char aliases.

```
    -l [KIND=]NAME      Link the generated crate(s) to the specified native
                        library NAME. The optional KIND can be one of
                        static, framework, or dylib (the default).
        --crate-type [bin|lib|rlib|dylib|cdylib|staticlib|proc-macro]
                        Comma separated list of types of crates
                        for the compiler to emit
```

Rust has additional options for codegen options:

{% example "rust/help-codegen" %}

As well as for linter options:

{% example "rust/help-lint-and-settings" %}

### ReScript

{% example "rescript/help" %}

### Swift

{% example "swift/help" %}

### Other build tools

These aren't compilers, which means they're a bit less rigidly "professional" in their output and have a bit more style about themselves. Rome especially is very clear in its hierarchy and visual weighting, but it's also very long - trade-offs. 

Some of these tools of these are definitely pushing the ANSI to HTML systems in my tooling, so forgive some ASCII/color errors. I'll get it fixed with time.

Rome's help output is coming up next, and it is probably my favourite of the whole set. Very effective use of bold, strong lines for delination between section and taking the width into account all make for a very polished introduction to the tool.

{% example "js/help-rome" %}

Jest has a static line width, and does a good job of wrapping the long paragraphs for the bazillion config options.

{% example "js/help-jest" %}

Prettier's help does a good job of categorizing different types of settings via a hierarchy.

{% example "js/help-prettier" %}

I wrote this CLI, sure, but I think I did a pretty good job on offering a bunch of ways to go from here in the "footer" which hasn't really been represented other than Jest's mention of the website.

{% example "js/help-danger" %}

The GitHub CLI does a good job of using **BOLD CAPS** to indicate categories, and then very predictable text output for the rest. They must have really thought about the copy for these commands because they are very terse!

{% example "js/help-ghcli" %}

Including the 'give us feedback' command at the end is a nice touch too.
