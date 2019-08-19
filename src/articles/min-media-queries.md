---
title: Media queries
slug: media-queries
techs: ["CSS", "Tailwindcss"]
date: "2019-08-19"
---

<!-- TODO: Add intro -->

## min-width media query approach

I didn't realize I was making media queries more complicated then they needed to be before trying out [Tailwind](https://tailwindcss.com/). Tailwind is a CSS framework/library that generates utility classes. We don't need to go into any specifics about tailwind, but basically, it comes with some media queries built-in.

<!-- TODO prevent formating? -->

```css
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
```

Notice that they are all _min-width_ media queries. I don't about you, but I normally am doing these kinds of media queries.

```css
@media (min-width: 640px) and (max-width: 767px) {
  /* mobile */
}
@media (min-width: 768px) and (max-width: 1023px) {
  /* tablet */
}
@media (min-width: 1024px) {
  /* desktop */
}
```

I realized using min-width only queries helps me think in a mobile first way. All of the queries start at the smallest resolution and then you only do overrides from there. I find that it also reduces duplication compared to my min/max approach, e.g. if I don't override "sm" size then it will flow through to the larger size media queries too.

## Specificity and @media

Media queries [don't increase specificity](https://css-tricks.com/how-much-specificity-do-rules-have-like-keyframes-and-media/) on their own. If a (min-width: 200px) query appears after a (min-width: 400px) query the _200px_ query will take precedence.

https://codepen.io/Samic8/pen/OJLyjNV

Tailwind includes all of its media queries after any other classes which means that the classes containing queries will have a higher specificity.

```css
/* Other classes (components) */
.btn {
  color: blue;
}

/* Media Queries */
@media (min-width: 640px) {
  .sm\:text-base {
    font-size: 16px;
  }
  .sm\:text-lg {
    font-size: 20px;
  }
}
@media (min-width: 768px) {
  .md\:text-base {
    font-size: 16px;
  }
  .md\:text-lg {
    font-size: 20px;
  }
}
```

Tailwinds classes all have very low specificity which makes this approach work. If you really want you can still create classes that have higher specificity even if they before the media queries.

```css
button.btn {
  /* higher specificity even on screens larger than 20px */
  font-size: 16px;
}

@media screen and (min-width: 20px) {
  .large-text {
    font-size: 40px;
  }
}
```

## How can this knowledge improve your codebase?

It depends what type of CSS you are writing, lets look at the different types:

### Componentized CSS

In cases where your not using many utility classes the cascade issue is less of a problem. Because you just write all of your queries together and control the order.

```scss
.btn {
  font-size: 16px;
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1000px) {
    font-size: 24px;
  }
}
```

### Utility + Componentized CSS

If you are using lots of utility classes then like tailwind the best approach might be to include all of your utility classes after your component CSS.

```scss
// Component Classes
.btn {
  font-size: 16px;
}

// Utility Classes
.large-text {
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }
  @media screen and (min-width: 700px) {
    font-size: 24px;
  }
}
```

Because the @media at-rule does not increase specificity (nor do any other at-rules) if the utility classes appeared first in the cascade adding both the 'btn' and 'large-text' classes to a element would result in the font-size always being 16px.

<!-- TODO: Add conclusion -->
