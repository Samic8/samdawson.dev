---
title: "How to unit test gatsby-node"
slug: gatsby-node-unit-tests
techs: ["Gatsby", "Jest"]
date: "2020-06-21"
featuredImage: "./gatsby-node-unit-tests.png"
---

This article will be enough to get you started with unit testing [gatsby-node.js](https://www.gatsbyjs.org/docs/node-apis/), we are not going to deep dive into every possible test you might need to make.

First of all, you need to ask yourself "should you test it?". What other tests do you have in place that cover this code? Do you have Visual Regression or End to End tests?

Even if you do have those in place, you may still decide that unit tests are worth writing because they increase your speed and confidence when making changes.

## Setup

There's a complete gatsby testing setup guide in the [gatsby documentation](https://www.gatsbyjs.org/docs/unit-testing/), for our purposes all we need is

1. Jest

```bash
yarn add -D jest
```

2. And node modules ignored

```jsx
// jest.config.js
module.exports = {
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
}
```

## gatsby-node tests

This is from a gatsby app that creates an e-book website, each chapter needs a page, so we use the `js,createPages()` API:

GITHUB-EMBED https://github.com/Samic8/robust-ui/blob/f6ec18f0154ad02e3b0faae1f92b2611fd00f6b2/gatsby-node.js javascript 1-41 GITHUB-EMBED

We are testing the "happy" path here and ignoring the error cases which might be enough for a gatsby site because your build will fail if errors occur.

Read over the tests then we will talk about anything unique:

GITHUB-EMBED https://github.com/Samic8/robust-ui/blob/f6ec18f0154ad02e3b0faae1f92b2611fd00f6b2/__gatsby_tests__/gatsby-node.test.js javascript GITHUB-EMBED

We are opting for a unit test instead of integration by mocking the `js,path.resolve()` dependency, and the `js,graphql()` and `js,action.createPage()` parameters.

Snapshot testing is for capturing the graphql query. Which is [borderline abuse](/article/the-snapshot-testing-tool) of the tool, but OK for small use cases like this.

We have mocked the `js,action.createPages()` parameters, which we then assert that it has run with the parameters.

## Beyond unit testing

Focusing exclusively on unit testing leaves us vulnerable breaking changes when upgrading gatsby. To assist with upgrades you could make use of visual regression tools like [percy](https://www.gatsbyjs.org/packages/gatsby-plugin-percy/) which are a better indicator of the whole website rendering as expected.
