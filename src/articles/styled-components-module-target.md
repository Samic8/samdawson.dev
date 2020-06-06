---
title: Styled Components losing their styles
slug: styled-components-losing-their-styles
techs: ["Gatsby", "React", "Typescript"]
date: "2020-06-03"
---

> **Update:** I later discovered that the real problem was styled-components v5. By downgrading to v4 the issue went away.

> "I spent all day on this" - Me

Styled Components, Gatsby, a component library — which also used styled-components — were the trio that caused this type of day.

I was having an issue where the components included from the component library via an NPM package were _sometimes_ loosing their styling. I could reproduce this issue consistently by:

1. Landing on a particular page
2. Navigating away form that page
3. Returning to the first page

The component from the library would of then lost its styling.

After going down many rabbit holes reading the source code of Styled Components and friends, I still could not put my finger on why this was happening.

It turns out it was the module compilation target of the component library that was causing the problem. It was being compiled to CommonJS, when I changed that to ES modules — ESnext in the case of the typescript compiler — it solved the issue.

I still don't know the _why_ behind this problem or solution. But after a day of mucking around with webpack configuration, I think this is good enough for me.

Disclaimer: I don't endorse the use of Styled Components.
