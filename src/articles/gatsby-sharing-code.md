---
title: Sharing code between gatsby-node and components
slug: gatsby-node-sharing-code
techs: ["Gatsby"]
date: "2021-01-29"
---

To share code between gatsby-node files and other components the shared file must use CommonJS syntax. For example:

```js
const invert = require("lodash/invert")

const chapterNumbers = {
  "The Robust UI Mindset": 1,
  "Testing Practices": 2,
  "Compound Components": 3,
  Hooks: 4,
  Mocks: 5,
  "SVG Graphs": 6,
  "Base/Variants Pattern": 7,
  Redux: 8,
  "Visual Testing": 9,
}

module.exports = {
  chapterNumbers: chapterNumbers,
  chapterTitles: invert(chapterNumbers),
}
```

The exported stuff can then be used in gatsby-node.js with a require import

```js
const { chapterNumbers, chapterTitles } = require("./src/utils/chapter")
```

and within components with ES module syntax

```js
import { chapterNumbers, chapterTitles } from "../utils/chapter"
```

This does not work if you try to use ES modules for the shared file. The gatsby-node file will complain about the syntax.
