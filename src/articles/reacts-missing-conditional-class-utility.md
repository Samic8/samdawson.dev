---
title: Reacts missing conditional class utility
slug: reacts-missing-conditional-class-utility
techs: ["React"]
date: "2019-11-17"
---

At [accelo](https://www.accelo.com/) we are in the process of transitioning from AngularJS to React. React does not come with a utility for conditionally applying classes the same way AngularJS has [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass). For me, this is a replacement for [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass) in React.

We are opting to not introduce a CSS-in-JS library and continue with our existing CSS/Sass approach. With a CSS-in-JS library you might have your conditional styling in this Javascript itself.

This utility is framework agnostic so it can be used in Vue (etc) despite the click-bait title of this article.

This replacement allows you to do the following (the classes use [BEM syntax](https://css-tricks.com/bem-101/)).

```js
// React functional component
import { getActiveClasses } from "get-active-classes"

const MenuItemFocus = ({
  orientation,
  forceActive,
  withTransition,
  className,
}) => (
  <div
    className={getActiveClasses("menuItemFocus", className, {
      "menuItemFocus--vertical": orientation === "vertical",
      "menuItemFocus--horizontal": orientation === "horizontal",
      "menuItemFocus--active": forceActive,
      "menuItemFocus--withTransition": withTransition,
    })}
  ></div>
)
```

So if the component had the props of

```js
<MenuItemFocus
  orientation="vertical"
  forceActive={true}
  withTransition={false}
  className="widthFull"
/>
```

the resulting HTML will be

```html
<div
  class="menuItemFocus widthFull menuItemFocus--vertical menuItemFocus--active"
></div>
```

Here is the code for the getActiveClasses function. It's written in typescript, but you can strip that out if you need to use it in a regular JS environment.

```ts
type ConditionalClasses = { [key: string]: any }
type Option = ConditionalClasses | string

export function getActiveClasses(...classes: Option[]): string {
  return [].concat(...classes).reduce((result, option: Option) => {
    const nextClasses =
      typeof option === "object" ? joinClasses(option) : option
    return `${result}${result ? " " : ""}${nextClasses}`
  }, "")
}

function joinClasses(classes: ConditionalClasses) {
  return Object.keys(classes)
    .filter(key => classes[key])
    .join(" ")
}
```

There is also a [packaged version of this utility](https://github.com/Samic8/get-active-classes) if you don't need to modify it at all.

```
 yarn add get-active-classes
```

Next up I'm thinking about performance with this utility in React. For example, caching the output if the input is the same to improve performance on additional renders. When I run into a case where I think the performance might an issue ill give that a go and update this blog post! (and package).
