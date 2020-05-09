---
title: "Union type from an array of strings"
slug: union-type-from-array
techs: ["Typescript"]
date: "2020-04-16"
---

Sometimes typescript can feel like duplication, describing code that is already static (constant). Heres one trick to mitigate that by generating a [string literal](https://mariusschulz.com/blog/string-literal-types-in-typescript) union type from an array.

```typescript
// *as const* tells typescript that this array won't change
const intervals = ["hour", "day", "week", "month", "year"] as const

// *typeof* grabs all of the values with a *number* index and creates a union type
type Intervals = typeof intervals[number]
```

The resulting type, if it was hard-coded would become a union type of string literals.

```typescript
type Intervals = "hour" | "day" | "week" | "month" | "year"
```

**const assertions** (as const) were introduced in [Typescript 3.4](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions). If you are using babel to transform your typescript code, make sure that your [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) and [@babel/core](https://www.npmjs.com/package/@babel/core) packages are up to date.
