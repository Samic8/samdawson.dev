---
title: My CSS Color System
slug: color-system
techs: ['CSS']
date: "2019-07-22"
---

My approach to color usage is similar to a "no magic numbers" rule that you might find in javascript, where colors are always referenced from a variable.

It's useful to think about color usage throughout a site as a theme, even if there are not multiple themes. This system for theming has two parts *numbered colors* and aliases, experiment and see what works for you.

## Numbered Colors
We are going to store our colors as CSS variables and prefix all colors with **color** (how inventive!). These colors are stored on the **:root** scope so they are globally accessible.

```css
:root {
    --color-blue-1: '#ebf8ff';
    --color-blue-2: '#bee3f8';
    --color-blue-3: '#90cdf4';
    --color-blue-4: '#63b3ed';
    --color-blue-5: '#4299e1';
    --color-blue-6: '#3182ce';
    --color-blue-7: '#2b6cb0';
    --color-blue-8: '#2c5282';
    --color-blue-9: '#2a4365';
}
```

The numbering system is a design system too, it provides constraints to work by and it's easy to see when there are too many types of one color shade.

The numbering system goes from lightest to the darkest version of the color. The "lightness" and "darkness" are not calculated just pick some colors that look good manually. 


## Aliases

Color *aliases* provide a way to give meaning to color usage and keeping colors in sync across multiple usages that have the same **meaning**.

```css
:root {
    --color-alias-cta-button: var(--color-blue);
    --color-alias-page-header: var(--color-blue);
}
```

Aliases can have varying levels of specificity in their naming
* **--color-alias-cta-button** is a concept that might appear in multiple classes.
* **--color-alias-page-header** applies to a specific element.

```css
.page-header {
    background-color: var(--color-alias-page-header);
}

.sign-up-button {
    background-color: var(--color-alias-cta-button);
}

.save-button {
    background-color: var(--color-alias-cta-button);
}
```

Not everything needs to be an alias. If you use a background color on the **page-header** and it uses one of the shades of blue maybe it does not need to be in sync with anywhere else.

```css
.page-header {
    background-color: var(--color-blue);
}
```

### When to use an alias? Questions to ask:
* Does this color convey any meaning?
* Does this color need to be in sync with another element?

That's it. Depending on your flavor of CSS (pre-processors, CSS-in-JS) your implementation will look different. However you do it, come up with a system for your color usage. Both yourself for maintainability and your users for consistency will thank you.