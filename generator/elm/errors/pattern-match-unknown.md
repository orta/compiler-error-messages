---
title: Pattern Match Unknown
lang: elm
tags: ["not-comprehensive", "pattern-match"]
---

Occurs when Elm a pattern match (fancy switch statements) don't cover all cases:

```elm Pattern.elm
module Pattern exposing (..)

type Foo
    = Bar
    | Baz

doThing x =
    case x of
        Bar ->
            5
```
