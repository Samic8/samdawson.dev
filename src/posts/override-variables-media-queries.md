---
title: Inheritance and media queries with CSS variables
slug: css-variables-media-queries
techs: CSS
date: "2019-07-27"
---

It's possible to override CSS variables with inheritance.

Lets set up some variables.

```css
:root {
    /* Colors */
    --color-blue-1: #4287f5;

    /* Color Aliases */
    --color-alias-cta-button: var(--color-blue);
}
```
More about the color naming in a [previous post](./color-system).

We might have a **cta-button** class that then uses our color aliases variable.

```css
.cta-button {
    background-color: var(--color-alias-cta-button);
    color: var(--color-white);
}
```

and we can use it.

```html
<button class="cta-button">Sign up!</button>
```
some pretty basic stuff!

Maybe we have a section of our site where we want to apply a dark theme, we could take advantage of inheritance by creating a class with the variable override.

```css
.dark-theme {
    --color-alias-cta-button: var(--color-black);
}
```

Then applying it anywhere as a parent to our cta-button which makes use of the same variable we are overriding.

```html
<div>
    <h2>Default Theme</h2>
    <button class="cta-button">Sign up!</button>
</div>
<div class="dark-theme">
    <h2>Dark Theme</h2>
    <button class="cta-button">Sign up!</button>
</div>
```
This does not just work for colors we can use this pattern for any property.

## Media Queries 

We can also override variables with media queries. Instead of overriding properties directly:

```css
.header {
    height: 50px;
}

@media screen and (min-width: 900px) {
    .header {
        height: 30px;
    }
}
```
We can override the variables used within a class:

```css
.header {
    --header-height: 50px;
    height: var(--header-height);
}

@media screen and (min-width: 900px) {
    .header {
        --header-height: 30px;
    }
}
```

Overriding may not always possible because you may need to introduce new properties within a media query and not just override:
```css
.header {
    --header-height: 50px;
    height: var(--header-height);
}

@media screen and (min-width: 900px) {
    .header {
        --header-height: 30px;
        /* Flex was not in the original class */
        display: flex;
    }
}
```

When you can pull off a media query by only overriding variables it keeps all of what a class is concerned within one place:

```css
.header {
    /* Defining all of the base values within the main class */
    --header-height: 50px;
    --header-display: block;
    height: var(--header-height);
    display: var(--header-display);
}

@media screen and (min-width: 900px) {
    .header {
        /* Then only doing overrides in the media query */
        --header-height: 30px;
        --header-display: flex;
    }
}
```

I think this pattern of the base class always having the defaults for every property it will use throughout its life on a page leads to CSS that is easier to reason about.

This pattern is a similar concept that you might find in javascript where what the function does is in the first few lines of the function then it runs other functions which become the implementation details.

```js
function setup() {
    buildHTML();
    draw();
    print();
}

function buildHTML { /* ... */ }
function draw { /* ... */ }
function print { /* ... */ }
```

### Inheritance and media queries
The inheritance and the media query techniques can be used in combination too.

```css
@media screen and (min-width: 900px) {
    .dark-theme {
        --color-alias-cta-button: var(--color-black);
    }
}
```
