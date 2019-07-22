---
title: A Color System for CSS
slug: color-system
techs: CSS
date: "2019-07-22"
---

Using raw color values like hex codes through your CSS is not very maintainable. My approach to color usage is similar to a "no magic numbers" rule that you might of used in javascript, where colors are always referenced from a variable.

Its useful to think about color usage throughout a site as a theme, even if there are not multiple themes. This is one system for theming color usage which has two parts *named colors* and aliases, experiment and see what works for you. 
## Named Colors
Colors need unique names, we are going to store them as CSS custom properties but you could use preprocessor variables too. A convention that has worked well for me is prefixing all colors with color (how inventive!). These colors should be stored globally on the **:root** level so they are available everywhere.

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

The numbering system is a design system too, it provides constrains to work by, its easy to see when there are too many types of one color shade. The numbering system starts from the lightest version of the shade and increases in darkness with each number. The "lightness" and "darkness" are not calculated just pick some colors that look good manually. 

*Hot Tip:* Instead of darkening or lightening colors using preprocessor functions, increment or decrement your color number. Using the functions will leave you with inconsistencies across your site of colors that are slightly different from one another.

## Aliases

Ok now we have the named colors in place and are ready to use those colors. Thats where color *aliases* come in, they give you a way to give meaning to color usage.

Aliases are a tool for keeping colors in sync across multiple usages that have the same **meaning**.

```css
:root {
    --color-alias-cta-button: var(--color-blue);
    --color-alias-page-header: var(--color-blue);
}
```

Aliases can have varying levels of specificity in their naming, in this example we have **--color-alias-cta-button** color which does not apply to a specific element instead a concept. Then we have **--color-alias-page-header** which applies to a very specific element in our site.

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

Not everything needs to be an alias, for a one off usages use the color variable. If you use a particular background color on the **page-header** and it uses one of the shades of blue maybe it does not need to be in sync with anywhere else.

```css
.page-header {
    background-color: var(--color-blue);
}
```

### When to use an alias? Questions to ask:
* Does this color convey any meaning?
* Does this color need to be in sync with another element?

Thats it. Depending on your flavour of CSS (pre-processors, CSS-in-JS etc) your implementation will look different. However you do it, think in systems with your colors, both yourself for maintainability and your users for consistency will thank you.