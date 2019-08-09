---
title: A gotcha when using gatsby, tailwind and purgecss
slug: gatsby-tailwind-purgecss
techs: ["CSS", "Tailwindcss"]
date: "2019-08-09"
---

A problem I came across when using a mix-match of [tailwind](https://tailwindcss.com), [purgecss](https://www.purgecss.com/) and [Gatsby](https://gatsbyjs.org) is that selectors used in the generated pages were being stripped from the CSS.

Tailwinds docs recommend using [purgecss](https://tailwindcss.com/docs/controlling-file-size/#app) to remove unused selectors, which in my case greatly reduced my CSS bundles.

On this website I use [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) to generate my articles from markdown files. These files then contain elements that purgecss does not know about and removes the selectors.

I think the best soultion might be to run purgecss over the generated HTML files, but I haven't quite figured out how to do that yet. In the meantime, I have come up with a solution that is working. I am using [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/?=purgecss)

```js
// gatsby-node.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // Turn develop to true for testing purgecss locally
        develop: false,
        tailwind: true,
      },
    },
  ],
}
```

## Excluding @base

The first problem was that the tailwinds @base selectors were being removed, which included selectors like

```css
img {
  display: block;
  vertical-align: middle;
}
```

because purgecss does not know about the generated HTML files, it thought an **img** element was never used so it removed the above CSS.

To fix this problem I created a seperate CSS file for tailwinds @base selectors

```css
/* src/styles/base.css */
@tailwind base;
```

and then ignored it in the purgecss config

```js
// gatsby-node.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        // Turn develop to true for testing purgecss locally
        develop: false,
        tailwind: true,
        ignore: ["/src/styles/base.css"],
      },
    },
  ],
}
```

## Excluding generated page styles

I also had some specific selectors that I created for the article pages that were being removed so I added it to the ignore list too

```js
// ...
ignore: ["/src/styles/base.css", "/Article.css"],
```

## Excluding prismjs

I use [prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prismjs) for the styling of my code snippets

```js
// ...
ignore: ["/src/styles/base.css", "/Article.css", "prismjs/"],
```

I hope this helps anyone else with this specific problem, let me know if you have a better way of handling this I would like to hear it.
