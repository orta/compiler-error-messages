---
title: Ambiguous Type Based on Name
lang: elm
tags: ["conflicts", "imports"]
---

Occurs when Elm cannot resolve which 'map' to use from the two imports:

```elm AmbigType.elm
module AmbigType exposing (..)

import Dict exposing (map)
import List exposing (map)

foo = map
```
