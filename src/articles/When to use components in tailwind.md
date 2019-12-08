---
title: When utility classes get out of control
slug: tailwind-css-components
techs: ["Tailwindcss"]
date: "2019-12-08"
---

[Tailwinds](https://tailwindcss.com/) utility classes make styling lighting fast (for me at least) but I have found there is a point where conditional styling can become hard to maintain because it concentrates the complexity in one place (Javascript / HTML template).

We are going to be looking into an example of a component which is a visual indicator for button focus and hover. The component takes a few props orientation, withTransition and forceActive.

`oembed: https://codepen.io/Samic8/pen/eYmOPgY`

Don't pay too much attention to the styling and classes in this Codepen, it's not exactly the same as some of the example code we are going to walk through.

## Utility class only

My first attempt at this component used utility classes for the styling exclusively. It's not the most complex component, but it does have a few states which do make it a bit hard to understand at a glance what the different states are and what their styling will be under certain conditions.

```js
// MenuItemFocus.js
import React from "react"

export default function MenuItemFocus({
  className,
  orientation = "vertical",
  withTransition,
  forceActive,
}) {
  const verticalClasses = {
    "top-0 bottom-0 left-0": orientation === "vertical",
    "w-0 group-hocus:w-1": orientation === "vertical" && !forceActive,
    "w-1": orientation === "vertical" && forceActive,
    "transition-250 transition-ease transition-width":
      orientation === "vertical" && withTransition,
  }

  const horizontalClasses = {
    "h-0 group-hocus:h-1 bottom-0 left-0 right-0": orientation === "horizontal",
    "h-0 group-hocus:h-1": orientation === "horizontal" && !forceActive,
    "h-1": orientation === "horizontal" && forceActive,
    "transition-250 transition-ease transition-height":
      orientation === "horizontal" && withTransition,
  }

  return (
    <div
      ref={ref}
      className={getActiveClasses([
        "bg-blue-500 absolute z-10",
        className,
        {
          ...verticalClasses,
          ...horizontalClasses,
        },
      ])}
    ></div>
  )
}

// Classes to be applied on the parent of the MenuItemFocus component
export const MenuItemFocusParentClasses = "relative group"
```

(Links to [hocus](https://github.com/benface/tailwindcss-interaction-variants) and [getActiveClass](https://www.samdawson.dev/article/reacts-missing-conditional-class-utility))

Where I think this component got a bit out of control is managing which classes get applied from a combination of conditions.

Because of the lack of control of CSS specificity we have to make sure that certain classes don't conflict. For example, toggling the classes that appear in combination with "horizontal" orientation and the forceActive flag.

```js
 "h-0 group-hocus:h-1": orientation === "horizontal" && !forceActive
 "h-1": orientation === "horizontal" && forceActive,
```

When things get this complex it may be time to refactor to a [tailwind "CSS component"](https://tailwindcss.com/docs/extracting-components/#extracting-css-components-with-apply).

## [Tailwind "CSS component"](https://tailwindcss.com/docs/extracting-components/#extracting-css-components-with-apply) version

To reduce complexity in the component we are going to create some classes 😱

Because we now have the power of CSS combination class selectors and specificity we now only need a class for each condition and can ignore the styling for the combination of conditions (in the JS at least).

```js
import React from "react"
import { getActiveClasses } from "../utility"
import "./MenuItemFocus.scss"

export default function MenuItemFocus({
  className,
  orientation = "vertical",
  withTransition,
  forceActive,
}) {
  return (
    <div
      className={getActiveClasses([
        "menuItemFocus",
        {
          "menuItemFocus--vertical": orientation === "vertical",
          "menuItemFocus--horizontal": orientation === "horizontal",
          "menuItemFocus--active": forceActive,
          "menuItemFocus--withTransition": withTransition,
        },
        className,
      ])}
    ></div>
  )
}

export const MenuItemFocusParentClasses = "menuItemFocusParent"
```

The CSS is now where we are concerned about the styling when there is a combination of modifiers. The double dash denotes a "modifier" class in [BEM](http://getbem.com/) and [@apply](https://tailwindcss.com/docs/functions-and-directives/#apply) is a tailwind function.

```scss
:root {
  --menu-item-focus-size: 4px;
  --menu-item-focus-transition-duration: 0.25s;
}

.menuItemFocus {
  @apply absolute z-10 bg-blue-500;
}

.menuItemFocus--withTransition {
  &.menuItemFocus--vertical {
    transition: width var(--menu-item-focus-transition-duration) ease;
  }

  &.menuItemFocus--horizontal {
    transition: height var(--menu-item-focus-transition-duration) ease;
  }
}

.menuItemFocus--vertical {
  @apply top-0 bottom-0 left-0 w-0;
  /* Combination of modifiers are dealt with here */
  &.menuItemFocus--active,
  .menuItemFocusParent:hover &,
  .menuItemFocusParent:focus & {
    width: var(--menu-item-focus-size);
  }
}

.menuItemFocus--horizontal {
  @apply right-0 bottom-0 left-0 h-0;

  &.menuItemFocus--active,
  .menuItemFocusParent:hover &,
  .menuItemFocusParent:focus & {
    height: var(--menu-item-focus-size);
  }
}

.menuItemFocusParent {
  @apply relative;
}
```

I used a mix of @apply and regular CSS. I think making every property use @apply hurts readability. Sass or [Postcss-nested](https://github.com/postcss/postcss-nested) can be used to achieve the nesting syntax with the & operator.

Like I said at the start tailwind makes styling lighting fast for me. I'm experimenting with when it makes sense not to use utility classes exclusively and when the cost (readability) out weights the benefits (quicker styling).

I think the example we ran through in this post was borderline in its complexity caused by utility class usage, we could have probably left it as is and it would have been maintainable. In reality, we probably would have only refactored it to a "CSS component" if it was a bit more complex.

The example did showcase that we probably want to watch out for times where we are managing a combination of conditions and each combination has specific styling. CSS is better equipped to handle this through the use of combination class selectors and overrides through specificity.
