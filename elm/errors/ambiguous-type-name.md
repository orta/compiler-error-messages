---
title: Ambiguous Type Based on Name
tags: ["conflicts", "imports"]
---

Occurs when Elm cannot resolve which 'map' to use from the two imports:

```elm Two.elm
module Two exposing (..)

import Dict exposing (map)
import List exposing (map)

foo = map
```

<!--  This md file is compiled by Elm to give the below html -->
