---
title: Using min-width media queries by default
slug: min-media-queries
techs: ["CSS", "Tailwindcss"]
date: "2019-08-12"
---

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

Notice that they are all **min-width** media queries. I don't about you, but I normally am doing these kinds of media queries.

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

Notice that I am also having to minus one pixel from the next queries min-width in the max-width's to avoid overlap.

When using min-width only queries it helps you think in a mobile first way, the base properties of a class is for the smallest screen and then you make overrides from there. I found it also helps avoid duplication, instead of having to define the same properties for two different queries that are after one another in screen width.

## Specificity and @media

Media queries [don't increase specificity](https://css-tricks.com/how-much-specificity-do-rules-have-like-keyframes-and-media/) on their own. If a (min-width: 200px) query appears after a (min-width: 400px) query in the cascade it might not do what you expect.

https://codepen.io/Samic8/pen/OJLyjNV

Tailwind includes all of its media queries after any other classes so that the classes containing queries will have a higher specificity.

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

## How can we use this knowledge for to use practically?

### Cascade and media queries

The main thing I have learnt here is that

### Componentised CSS

When writting CSS where you are not using many utility classes the cascade issue is less of a problem. Because you just write all of your queries together and controll the order

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

### Utility CSS

<!-- TODO: Link this to CSS-group about our utility classes -->

If you are using lots of utility classes then like tailwind the best approach here might be to include all of your utility classes after your component CSS.

```scss
// Utility Classes
.large-text {
  @media screen and (min-width: 700px) {
    font-size: 20px;
  }
  @media screen and (min-width: 700px) {
    font-size: 24px;
  }
}

// Component Classes
.btn {
  font-size: 16px;
}
```

Because the `@media` at-rule does not increase specificity (nor do any other at-rules) if both of those classes were applied it might not do what you expect

<!-- TODO: maybe something more visual then font size -->

```html
<div class="btn large-text">Hi!</div>
```

but if the utility classes are included after it might do more of what you want. Because the cascade increases the specificity.

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

but if you want to use two class on a element and both of those have media queries then the cascade becomes a problem again

```css
.large-font {
  @screen sm {
    font-size: 22px;
  }

  @screen md {
    font-size: 30px;
  }
}
```

<!-- TODO: test this out in a codepen -->

```html
<button class="btn large-font"></button>
```

You could get around this by including all of your media queries in the one file, but with that approach you would have to jump between files when editing CSS for class.

<!-- TODO: example? -->

There might be inventive ways that you could achieve the min-width only approach in non-tailwind projects. Maybe with a webpack loader that extracts all your media queries and puts them in order. But that seems a bit magical.

I found that the min-width only media query made my CSS easier to understand, it kind of forces you to think about things in a mobile-first way. All of your queries start at the smallest resolution and then you only do overrides from there. I find that it also reduces duplication compared to my other approach, e.g. if I don't override "sm" size then it will flow through to the larger size media queries too.

<!-- TODO: Does this still apply if you use the @screen approach in tailwind? https://codesandbox.io/s/tailwindcss-template-y6nne -->
