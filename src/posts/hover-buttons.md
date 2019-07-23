---
title: Elements that move on hover
slug: elements-that-move-on-hover
techs: CSS
date: "2019-07-20"
---

I like elements that move on hover to convey interactivity. A problem with this pattern is "flickering" that can happen when hovering over the space left behind.


First lets make the button move up on hover.
```css
button:hover {
  transform: translateY(-0.2rem);
}
```
Without any other additions we will end up with the mentioned "flickering" when hovering over the space left behind.

![Flickering](hover-buttons.gif)

To improve this we could add an element to fill in the space left behind.
```css
button:hover::after {
  display: block;
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  /* Fill up the space left behind (+ a little extra) */
  height: 0.4rem; 
}
```

## Full example
Here is a full example on Codepen with both buttons

https://codepen.io/Samic8/pen/XwvPLq