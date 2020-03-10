---
title: Don't make assumptions about JS performance
slug: js-perf-assumptions
techs: ["Javascript"]
date: "2020-03-11"
---

After re-reading [YDKJS: Async and Performance](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/sync-async). I had the realization that I have been making over-optimizations. I had not taken into consideration [JS engine optimizations](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/sync-async/ch6.md#engine-optimizations).

## Iterators

Like always using iterators directly

```js
const foo = new Map(/* ... */)

const results = []
for (let [key, value] of foo) {
  results.push(value + "baz")
}
```

Instead of transforming it to an array first, to take advantage of the convenient array methods

```js
const foo = new Map(/* ... */)

const results = [...foo].map(([key, value]) => {
  return value + "baz"
})
```

I thought that this would cause two loops. Iterating over the Map once to transform it into an array and then a second to perform operations on each value.

Compare them: [https://jsperf.com/map-to-array-forach-vs-for-of](https://jsperf.com/for-of-vs-array-map)

## Array.reduce

Also opting for the reduce

```js
const foo = [
  /* ... */
]

const result = foo.reduce((acc, num) => {
  if (num > 3) acc.push(num * 22)
  return acc
}, [])
```

Instead of a more readable map and filter

```js
const foo = [
  /* ... */
]

const result = foo.filter(num => num > 3).map(num => num * 22)
```

I thought that reduce would also _reduce_ the number of loops.

Compare them here: [https://jsperf.com/reduce-vs-filter-map-22](https://slack-redir.net/link?url=https%3A%2F%2Fjsperf.com%2Freduce-vs-filter-map-22)

<br/><br/>

I'm thinking now of JS of being more declarative (what I want the code to do) rather than the actual sequence of events that happen. This is not to say throw any performance optimizations out the window, but instead to test assumptions I make before they end up everywhere in my code.
