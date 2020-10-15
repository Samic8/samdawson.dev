---
title: "How to test React Context"
slug: react-context-testing
techs: ["React", "Jest"]
date: "2020-07-17"
# featuredImage: ""
---

React Context is a tool for designing flexible Component APIs. Let's explore how to write unit tests for components that use it.

This is an example of _implementation_ testing. Which is not ideal, but it might be worth testing anyway to give you confidence in your code.

## Theming Example

Instead of "prop drilling" where we pass a theme prop into every component, we can create a `ThemeContext` which will be consumed by many components:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/922369fe5a14ebb1e2fe7306fc4abfa6f1a58f18/src/components/context-mocks/ThemeContext.js jsx GITHUB-EMBED

The source of truth for the active theme is the `theme` property, and the `onThemeChange` function allows any component to change the theme.

To get any value from `ThemeContext` we need to wrap any components that need to access the theme:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/922369fe5a14ebb1e2fe7306fc4abfa6f1a58f18/src/components/context-mocks/Page.js jsx GITHUB-EMBED

We can then make use of the `ThemeContext` in the `jsx,<BlogPost />` component. It both reads the theme value and updates it through the `onThemeChanged` callback:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/922369fe5a14ebb1e2fe7306fc4abfa6f1a58f18/src/components/context-mocks/BlogPost.js jsx GITHUB-EMBED

### Testing The Consumer

Components can either be a Consumer or Provider of context, not both. `jsx,<BlogPost />` is a Consumer, lets write tests for it:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/922369fe5a14ebb1e2fe7306fc4abfa6f1a58f18/src/components/context-mocks/BlogPost.test.js jsx GITHUB-EMBED

Notice here we don't have 100% code coverage of `jsx,<BlogPost />`, we are missing tests for the dynamic classes: `css,.light-theme` and `css,dark-theme`. Testing styles is best left to tools like [Storybook](https://storybook.js.org/).

### Testing The Provider

If the Provider component does not have `js,{ children }` props like `jsx,<Page />`, we can employ a speciality tool: mocking a child component and consume the Context we want to test.

This is a very fragile test as it relies a heavily on the components _implementation_. A false-negative test could happen if the mocked component is removed from the `<Page />` component.

With that warning, here is an example of the speciality tool:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/922369fe5a14ebb1e2fe7306fc4abfa6f1a58f18/src/components/context-mocks/Page.test.js jsx GITHUB-EMBED

The `BlogPost.mockImplementation()` is the important and dangerous aspect. We mock a child component of `<Page />` and consume the context which we can run assertions against.
