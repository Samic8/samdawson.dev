---
title: "Testing Hooks - Code organization"
slug: how-to-test-react-hooks-2
techs: ["React", "Jest"]
date: "2020-11-14"
---

This is a part of a series on [Testing Hooks](how-to-test-react-hooks).

The first category of hook usage is code organization to make our code easier to read. This is usually in the form of breaking a component into smaller parts, just like we might do with a regular non-React function.

```jsx
// Original Function
export function calculateBillingTotal(team) {
  return team.reduce((teamTotal, { addons, excededUsageCost, planBaseCost }) => {
    const addonCost = addons.reduce((addonTotal, { addonBaseCost, addonExtrasCost }) => {
      return addonTotal + addonBaseCost + addonExtrasCost
    }, 0)

    return teamTotal + excededUsageCost + planBaseCost + addonCost
  }, 0)
}

// Broken into smaller parts
export function calculateBillingTotal(team) {
  return team.reduce((teamTotal, { addons, excededUsageCost, planBaseCost }) => {
    return teamTotal + excededUsageCost + planBaseCost + calculateAddonsBillingTotal(addons)
  }, 0)
}

function calculateAddonsBillingTotal(addons) {
  return addons.reduce((addonTotal, { addonBaseCost, addonExtrasCost }) => {
    return addonTotal + addonBaseCost + addonExtrasCost
  }, 0)
}
```

Readability is subjective, but you get the point. We can break a component into smaller parts with hooks the same way we did above with a function being broken into smaller functions.

<!-- TODO link to compound component section -->

To explore this idea with hooks let's look at this `<Option />` component, which is part of [compound component](https://www.samdawson.dev/).

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/included-logic/Option.js jsx GITHUB-EMBED

<!-- TODO link to section about private functions -->

This component is small but for the point of this chapter let's pretend there was a lot of related logic that we could abstract into a hook to improve readability. We could create a private hook to group this logic -- it's private because it's within the same file and not exported and used elsewhere.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-private-logic/Option.js jsx GITHUB-EMBED

For this category of hook, it's most effective to write tests in a way where the tests don't have any knowledge that the hook exists.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-private-logic/Multiselect.test.js jsx 1-40,75 GITHUB-EMBED

When our tests are written like this it allows us to change the implementation without changing the tests. Both the example without the hook and with the hook will pass the same tests. So when another developer or our future self decides that private hooks are blasphemy, we can refactor without having to make changes to the tests and we will still be confident that the component works as expected.
