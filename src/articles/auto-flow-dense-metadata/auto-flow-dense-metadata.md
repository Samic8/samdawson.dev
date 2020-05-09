---
title: "Taking advantage of CSS grid auto-flow: dense with metadata"
slug: dense with metadata auto-flow-dense-metadata
techs: ["CSS"]
date: "2020-05-09"
draft: true
---

`grid-auto-flow: dense` tells grid to slot in items where there is space. This shuffles around the visual order of the elements, the DOM tree remains in the original order.

A dense layout can look something like this, where the items appear as dynamic sizes and CSS grid clicks them together where there is space.

<iframe src="https://cranky-joliot-780f3b.netlify.app/" height="600px" style="margin-bottom: 1.5rem"></iframe>

To get this to work it's not as easy as just putting images of varying sizes inside the grid container. Each item needs to have the number of columns and rows its **spans** set. To do this dynamically based on the image size we need to lean on Javascript.

A React component for the grid items might look something like this, where the amount of column/rows spanned is calculated based on the image **metadata** (width/height).

```jsx
function ImageGridItem({ image }) {
  const style = {
    gridColumnEnd: `span ${getSpan(image.width)}`,
    gridRowEnd: `span ${getSpan(image.height)}`,
  }

  return <img style={style} src={image.url} alt={image.alt} />
}

function getSpan(size) {
  /* Not perfect as this logic will lead to images being cropped */
  if (size > 250) {
    return 2
  }

  return 1
}
```

The grid container needs to have that `grid-auto-flow: dense` property!

```css
.gridContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-template-rows: repeat(auto-fit, 260px);
  grid-auto-flow: dense;
  grid-gap: 0.3rem;
}
```

The zoom functionality in the example can be created by changing the template column/rows sizing dynamically.
