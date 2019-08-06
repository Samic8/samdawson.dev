---
title: Inheritance media queries and css variables
slug: css-variables-inheritance-media-queries
techs: ['CSS']
date: "2019-07-27"
---

This article aims to show an alternative to overriding properties directly. Instead we can use CSS variables with the help of *inheritance* and *media queries*. I think that this approach leads to CSS that is easier to read, where all of the properties that appear on a class are all defined in one place.

To demonstrate [**inheritance**](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Inheritance_of_custom_properties) we need a class that uses some variables 
```css
.sign-up-button {
    background-color: var(--color-alias-sign-up-button);
    color: var(--color-white);
}
```

Maybe we have a section of our site where we want to apply a dark theme to our sign up button, we can create a class to override the variable used in the **sign-up-button** class

```css
.dark-theme {
    --color-alias-sign-up-button: var(--color-black);
}
```

To override through **inheritance** we can use our *dark-theme* class as a parent element to our button

```html
<div>
    <h2>DEFAULT</h2>
    <button class="sign-up-button">SIGN UP</button>
</div>
<div class="dark-theme">
    <h2>DARK THEME</h2>
    <button class="sign-up-button">SIGN UP</button>
</div>
```
This will only override the variable usage for the children elements of our override class. If we wanted to override the variable for all elements we can use the `:root` selector
```css
:root {
    --color-alias-sign-up-button: var(--color-black);
}
```
https://codepen.io/Samic8/pen/jjdJXR


## Media Queries 

Similar to inheritance through parent elements we can also override variables with [**media queries**](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

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

Only overriding variables may not always possible because you may need to introduce new properties within a media query
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

When you can pull off a media query by only overriding variables it keeps all of what a class is concerned within one place

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

I think this pattern of the base class always having the defaults for every property it will use throughout its life on a page leads to CSS that is easier to read.

This pattern is a similar concept that you might use in Javascript where what the function does is in the first few lines of the function then it runs other functions

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

### Combination
The **inheritance** and the **media query** techniques can be used in combination too

```css
@media screen and (min-width: 900px) {
    .dark-theme {
        --color-alias-sign-up-button: var(--color-black);
    }
}
```

## Related Resources
More about the color naming pattern in [another article](./color-system).