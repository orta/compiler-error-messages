---
title: Ambiguous Type Based on Name
lang: tsc
tags: ["conflicts"]
---

Occurs when TS  has two of the same types defined:

```ts index.ts
type A = {}
type A = {}
```
