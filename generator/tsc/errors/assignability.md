---
title: 
lang: tsc
tags: ["conflicts"]
---

```ts index.ts
/* @flow */
type A = { a: { b: { c: { d: "hello" } } } }

let a: A = { a: { b: { c: { d: "hello" } } } }
let b = { a: { b: { c: { d: 123 } } } }

a = b
```
