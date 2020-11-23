---
title: "How to test React Hooks"
slug: how-to-test-react-hooks
techs: ["React", "Jest"]
date: "2020-11-13"
---

The primary category of React hook usage is code reuse between components. When trying to determine a testing strategy for a particular hook a few more categories appear. One of code organization where a hook is only used to break a component up into easier to read parts, and another of mass consumption: these are hooks that are widely used throughout an app. The category of usage can help us determine how to test it.

Each category has a goldilocks zone of testing for effectiveness. I like to think of test effectiveness being determined by the amount of confidence in the code working as expected, its maintainability, and the amount of effort the tests take to write versus their reward.

Pairing one of the categories with an ineffective style of testing is not a problem for our immediate code confidence but it's detrimental to maintainability and effort vs reward. In the following sections, we are going to explore these categories and testing strategies for each.

## Chapters

1. [Hooks for Code Organization](how-to-test-react-hooks-2)
2. [Hooks for code reuse](how-to-test-react-hooks-3)
3. [Hooks for mass consumption](how-to-test-react-hooks-4)
