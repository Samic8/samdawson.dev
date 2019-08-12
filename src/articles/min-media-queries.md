---
title: Using min-width media queries
slug: min-media-queries
techs: ["CSS", "Tailwindcss"]
date: "2019-08-12"
---

I didn't realise I was creating media queries more complicated then they needed to be before trying out [Tailwind](https://tailwindcss.com/). Tailwind is a CSS framework/library that generates utility classes and it comes with a few media query breakpoints pre-configured. To show you what I learned we don't need to go into any tailwind details, but basically it comes with media queries built

<!-- TODO prevent formating? -->

```css
/* sm */
@media (min-width: 640px) {
}
/* md */
@media (min-width: 768px) {
}
/* lg */
@media (min-width: 1024px) {
}
/* xl */
@media (min-width: 1280px) {
}
```

Notice that they are all **min-width** media queries. I don't know how you, but I normally am doing these kind of media queries

```css
/* mobile */
@media (min-width: 640px) and (max-width: 767px) {
}
/* tablet */
@media (min-width: 768px) and (max-width: 1023px) {
}
/* medium */
@media (min-width: 1024px) and (max-width: 1279px) {
}
/* desktop */
@media (min-width: 1280px) {
}
```

Notice that I am also having to handle minusing 1 from the next values min-width in the max-widths
