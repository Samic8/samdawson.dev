---
title: "How to test React Context"
slug: react-context-testing
techs: ["React", "Testing"]
date: "2020-07-17"
updated: "2020-10-22"
# featuredImage: ""
---

React Context is a tool for designing flexible Component APIs. How we test it depends on the situation, we are going to explore some of the situations you might find yourself in and the best way to write maintainable tests for each of them.

The best way to test Context is to make our tests unaware of its existence and avoiding mocks. We want to test our components in the same way that developers would use them (behavioral testing) and mimic the way they would run in our applications (integration testing).

## Theming example

Let's set up our example which we will then explore how to test. We might choose Context to avoid "prop drilling" where we pass a theme prop into every component. To do this we can create a `ThemeContext`:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks-behavioural/ThemeContext.js#L1 jsx GITHUB-EMBED

To make `ThemeContext` useful we need to wrap components that need access to the theme in a Provider:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks/Page.js jsx GITHUB-EMBED

The source of truth for the active theme is the `theme` property and the `onThemeChange` function allows any component to change the theme.

We can then make use of the `ThemeContext` in the `jsx,<BlogPost />` component. It both reads the theme value and updates it through the `onThemeChanged` callback:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks-behavioural/BlogPost.js jsx GITHUB-EMBED

## Behavioral Testing Approaches

> The best way to test Context is to make our tests unaware of its existence

### Testing the Provider and Consumer Together

This type of test is available if both the provider and consumer are used within the component that you want to test such as in the case of `jsx, <Page />`. This allows us to write our tests without any mention of Context:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks-behavioural/Page.test.js jsx GITHUB-EMBED

If we decided we no longer wanted to use Context and change the implementation our tests would still pass.

### Testing a component with children that consume Context

This is a common pattern often used in [compound components](/article/compound-components-what-why-when) where the children components can consume Context provided by the _base_ component. In this example we have modified our `<Page />` component to accept children in this way:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks-behavioural-children-props/Page.js jsx GITHUB-EMBED

To test that Context is doing its job we can pass in a component that consumes the Context and test the functionality that Context enables for it:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks-behavioural-children-props/Page.test.js jsx GITHUB-EMBED

Once again this type of test does not couple us to the implementation detail that is our usage of Context.

## Implementation Testing Approaches

Use these with caution as they will make test files hard to maintain and read!

This is an example of _implementation_ testing. This is not ideal, but it might be worth doing in some situations to give you confidence in your code.

### Testing a Consumer without a Provider

It's going to be easier to maintain our tests if we choose to test the [provider and consumer together](/article/react-context-testing#testing-the-provider-and-consumer-together) instead of testing individual components. But if we wanted to test a component individually that relies on consuming Context we need to provide that Context:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/52e6ba5033d9aa34dcc35a7af4670a6c3b2d2058/src/components/context-mocks/BlogPost.test.js jsx GITHUB-EMBED

Notice here we don't have 100% code coverage of `jsx,<BlogPost />`, we are missing tests for the dynamic classes: `css,.light-theme` and `css,dark-theme`. Testing styles are best left to tools like [Storybook](https://storybook.js.org/).

### Testing a Provider without a Consumer

Don't bother with this trust me. It's possible but it only makes our tests complex and hard to maintain. Instead use the [behavioral testing approaches](/article/react-context-testing#behavioral-testing-approaches)
