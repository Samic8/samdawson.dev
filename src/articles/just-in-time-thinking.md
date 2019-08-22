---
title: Just in time thinking
slug: just-in-time-thinking
techs: ["React"]
date: "2019-09-22"
---

"Just in time thinking" is a tool for determining how much of a component to build. It's a lazy approach, only building as much as you need of a component (or function, etc.) when you need it.

You might be building a tooltip component that when you hover over an element it appears on top. In the future, you probably will need it to be able to appear on the left, right and bottom. But now all you need is for it to appear on the top.

To build the tooltip "just in time" you would build the top positioning and write the component in a way that it is easy to extend to support the other directions.

This strategy only works in specific situations, you need to consider the consumers of the component. If you are working on a small team or on your own this is probably fine, but if you are building a component library where your components will be used by many teams/people maybe you will want to build it with all the cases you can think of from the start.
