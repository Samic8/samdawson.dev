---
title: "Testing Hooks - Hooks for mass consumption"
slug: how-to-test-react-hooks-4
techs: ["React", "Testing"]
date: "2020-11-23"
---

> This is part three in a series on [Testing Hooks](how-to-test-react-hooks)

The final category of hook usage is one of utility. These are hooks from libraries or hooks that are used widely throughout your code. They often have a large API (many parameters or returned values) so all the hooks functionality might not be used by a single component. This is when we might consider testing a hook in isolation.

This does not mean that we would avoid testing the components that use the hook too, this is also an important part of our code confidence.

Let's have another look at our hook and then figure out how to write tests for it in isolation:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/isolated-public-hook/hooks/useMultiselectOption.js jsx GITHUB-EMBED

<!-- TODO link to context testing chapter -->

One special consideration we need to make for this hook is the usage of Context. We will have to find a way to mock Context in our tests.

To test our hook in isolation we are going to use [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library). It allows us to pass in a wrapper component that sets up the provider needed for Context.

<!-- Link to setup function -->

First, let's create a Setup Function so we can run our hook with different properties for each of the tests.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/e8dc36489910b065752a4cc8c61894a02484898f/src/components/hooks/isolated-public-hook/hooks/useMultiselectOption.test.js jsx 1-31 GITHUB-EMBED

Then we can run the hook with the different parameters needed for each of our tests.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/e8dc36489910b065752a4cc8c61894a02484898f/src/components/hooks/isolated-public-hook/hooks/useMultiselectOption.test.js jsx 31-99 GITHUB-EMBED

Writing tests like this where we test the hook in isolation makes our code more rigid. We would unlikely be able to change details in the hooks API without our tests breaking. When we [tested our components without testing the hook](/article/how-to-test-react-hooks-3) we were free to change implementation details without reworking our tests. But in the case of a hook within a library or widely used within an app, it might be worth the trade-off of effort for high code confidence.
