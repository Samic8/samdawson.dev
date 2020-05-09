---
title: Async real-time based code
slug: time-based-async
techs: ["Javascript"]
date: "2020-04-26"
---

I made [this pen](https://codepen.io/Samic8/full/eYpWzPq) to help me memorise notes on the guitar. It made me realize how confusing async time-based code can be, probably especially for me since my day-to-day work does not involve much real-time based work.

I had to keep the notes and the "dot" counters in sync, I'm using two different `window.setTimeout`'s so there is no guarantee that they will visually fire at the same time. In retrospect, I could have used a single `window.setTimeout` to control both to better keep them in sync.

Maybe using HTML canvas would have been simpler since it involves redrawing the canvas every X seconds making it more natural to keep two different time-based elements in sync.

`oembed: https://codepen.io/Samic8/pen/eYpWzPq`
