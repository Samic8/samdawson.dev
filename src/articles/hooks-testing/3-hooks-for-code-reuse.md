---
title: "Testing Hooks - Hooks for code reuse"
slug: how-to-test-react-hooks-3
techs: ["React", "Jest"]
date: "2020-11-15"
---

> This is a part two in a series on [Testing Hooks](how-to-test-react-hooks)

In the last section where we shuffled around some code to make it more readable, we were not taking full advantage of the benefits of hooks which is to share stateful logic between components.

Let's make a second option part for our Multiselect compound component so that we have a reason to reuse our hook. Let's say our app needs a Multiselect of users and it would be nice to have avatars on each option so the lists are easier to scan.
To begin we will need to make the hook public, which means for us that we will need to move it to its own file and export it.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-public-hook/hooks/useMultiselectOption.js jsx GITHUB-EMBED

Our first inclination might be to write unit tests for this new public function since it is isolated and can now change independently of our components. Instead, we can be more effective (for effort and maintainability) with our testing by writing tests only for the components that use the hook. This is reasonable in this case because the hook is only used in a couple of components. We will explore in the next section where this no longer makes sense to do.

Testing our components and hooks together both gives us more confidence that they are going to work together and cuts down the number of tests we will need to write. More tests are not always better, we want to aim for effective tests that give us the most confidence that our code is going to work as expected and ditch the rest.

Back to our example, we still have the original `<Option />` component that now uses our hook, and as we would expect our same tests still pass because we have not changed any functionality by making our hook public.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-public-hook/Option.js jsx GITHUB-EMBED

Let's then create our new `<PersonOption />` component which has the same functionality as our `<Option />` component with the addition of an avatar for a person.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-public-hook/PersonOption.js jsx GITHUB-EMBED

We then add tests for the `<PersonOption />` component. In this example of the compound component, both of the options are parts of the `<Multiselect />` so we are testing them together in the same file with very similar tests. Similar to the approach we explored in the [compound component testing article](https://www.samdawson.dev/article/how-to-test-compound-components).

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/f11fc66565cc241d37f422451d4697dc1c29f4dd/src/components/hooks/abstracted-public-hook/Multiselect.test.js jsx 1-42,76-110,144 GITHUB-EMBED

Because both of our components that use our hook now have tests and combined they both test the complete functionality of the hook. There is no confidence to be gained by testing the hook independently, and doing so would only lead to extra tests that need to be maintained and a loss of time in the present to write them.
