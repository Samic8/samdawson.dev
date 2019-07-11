---
title: Better button hover states
slug: hover-buttons
---

I like buttons that move on hover, it's nice. A problem with this pattern is "flickering" that can happen when hovering over the space left behind.
<br/><br/>
First lets make the button move up on hover.
```css
button:hover {
  transform: translateY(-0.2rem);
}
```
<br/>
Without any other additions we will end up with the mentioned "flickering" when hovering over the space left behind.

![Flickering ](images/hover-button.gif)

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
<br/>
Here is a full example on Codepen with both buttons
<br/><br/>
<iframe height="400" style="width: 100%;" scrolling="no" title="Better Moving Button Hover" src="//codepen.io/Samic8/embed/XwvPLq/?height=400&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/Samic8/pen/XwvPLq/'>Better Moving Button Hover</a> by Sam Dawson
  (<a href='https://codepen.io/Samic8'>@Samic8</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>