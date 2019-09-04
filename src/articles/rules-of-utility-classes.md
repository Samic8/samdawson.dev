---
title: Guidelines for css utility classes
slug: guidelines-for-css-utility-classes
techs: ["CSS"]
date: "2019-09-04"
---

## Never override them

Avoid CSS where the utility class is overridden. For example, overriding with a child selector.

```css
.navigation-bar .box-shadow-lg {
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.15);
}
```

You want them to be predictable everywhere you use them.

A warning sign for breaking this rule is when a utility class is referenced twice throughout your CSS files.

## Never change them

You might not know in every combination of classes that a utility class is used with. So changing the properties on a class might lead to unexpected changes in some locations.

## They should do one thing

Doing one thing makes them easily composable with other utility classes.

## Higher specificity by default

Add them after all other CSS so they have higher specificity by default than other classes. Adding them last gives them a higher specificity from the CSS cascade.

You might also want to include any utility classes that have media queries at the very end. I wrote [another article](https://www.samdawson.dev/article/media-queries-tailwind#specificity-and-media) exploring that idea.

## Use consistent naming

I think [tailwind](https://tailwindcss.com/) has some memorable names for its classes. If you're not using tailwind for your utility classes you might want to just use it for naming inspiration.
