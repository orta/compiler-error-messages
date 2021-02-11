---
title: Ambiguous Type Based on Name
lang: rust
tags: ["conflicts", "imports"]
---

Occurs when Elm cannot resolve which 'map' to use from the two imports:

```rust main.rs
#![allow(unused)]
fn main() {
  fn foo(x: Option<String>) {
      match x {
          // empty
      }
  }
}
```
