---
title: "The snapshot testing tool"
slug: the-snapshot-testing-tool
techs: ["Testing"]
date: "2020-04-17"
---

Kent C Dodds mentions in [his article about snapshot testing](https://kentcdodds.com/blog/effective-snapshot-testing) when referring to a particular snapshot.

<br/>

> "What makes this snapshot good is it can communicate the intent by the title of the snapshot"

<br/>

I think this is the most important guideline for **good snapshot testing**. Your test should assert very few things in its title and when the tests fail it's because the codes no longer is doing what is asserted the test's title, not because of something unrelated.

If that's hard to do it is likely that the snapshot is **too large** which is another indicator itself that snapshots might not be the right tool for the job.

I also found [Chris Girards guidelines](https://medium.com/javascript-in-plain-english/should-i-be-writing-snapshot-tests-47da13a62085) around **"When to write a snapshot test"** helpful and similar:

<br/>

> <ul><li>If a component is not updated often</li> <li>If a component is not too complex</li> <li>If it is easy to see what you are actually testing</li></ul>

<br/>

Snapshot testing can easily fall to the ["Golden hammer" fallacy](https://en.wikipedia.org/wiki/Law_of_the_instrument). If all you have is a hammer, then everything looks like a nail.
