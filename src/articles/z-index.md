---
title: z-index strategies
slug: z-index-strategies
techs: ["CSS"]
date: "2019-08-24"
---

Let's go over some ways to keep your z-index usage sane.

## All in one place

Keeping all of your z-indexes in one place, in order. That way you can easily see what sits on top of what.

```css
/* z-index-global.css */
:root {
  --z-index-tooltip: 60;
  --z-index-select-dropdown: 50;
  --z-index-popup: 40;
}
```

The global file is useful for common elements that are used throughout many pages. In combination with this strategy, you might want to also include files with "local" z-indexes for usage within a single component. I would still go with the same naming prefix so that if you ever need to move the z-indexes to your global file for usage elsewhere it's a simple copy & paste.

```css
/* z-index-date-picker.css */
:root {
  --z-index-date-picker-button: 10;
  --z-index-date-picker-dropdown: 20;
}
```

## Utility classes and variables

Creating some utility classes to use throughout your code.

```css
.z-index-30 {
  z-index: 30;
}
.z-index-20 {
  z-index: 20;
}
.z-index-10 {
  z-index: 10;
}
/* etc. */
```

The benefit of this approach is that you end up with well-defined z-indexes, but a pain-point is that you may have to dig around in your code to figure out what sits on top of what.

## Dynamic overlay

Another approach is to dynamically apply z-indexes to elements depending on the order that they appear. This can be used in combination with the previous approaches.

I will update this post soon with a codepen example of how this might work in react.

<!-- TODO: ## Dynamic overlay - make a codepen -->
