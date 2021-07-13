---
title: Redux selector test duplication
slug: redux-selector-test-duplication
techs: ["Javascript", "Jest"]
date: "2021-07-13"
---

When writing integration tests (tests that do minimal mocking) I often find myself duplicating test cases. In scenarios like this where I might have two functions that do similar things and share code.

This example uses redux selectors, but this same tactic could be used for regular functions.

```js
describe("selectProjects", () => {
  describe("given a project with start and end dates", () => {
    const state = {
      projects: [
        {
          id: "22",
          startDate: "1626164501934",
          endDate: "1626164524260"
        }
      ],
    }

    it("then returns all projects with duration", () => {
      expect(selectProjects(state)).toEqual([
        {id: "22", durationMilliseconds: "22326" }
      ])
    })
  })
})

describe("selectProject", () => {
  describe("given a project with state and end dates", () => {
    const state = {
      projects: [
        {
          id: "22",
          startDate: "1626164501934",
          endDate: "1626164524260"
        }
      ],
    }

    it("then returns a project with duration", () => {
      expect(selectProject(state, "22")).toEqual(
        {id: "22", durationMilliseconds: "22326" }
      )
    })
  })
})
```

I've found for cases like this where I want to test the same functionality in slightly different ways that they often can be combined.

```js
describe("selectProjects and selectProject", () => {
  describe("given a project with start and end dates", () => {
    const state = {
      projects: [
        {
          id: "22",
          startDate: "1626164501934",
          endDate: "1626164524260"
        }
      ],
    }

    it("then returns project with duration", () => {
      const transformedProject = {
        id: "22",
        durationMilliseconds: "22326"
      };

      expect(selectProjects(state)).toEqual(
        [transformedProject]
      )

      expect(selectProject(state, "22")).toEqual(
        transformedProject
      )
    })
  })
})
```

The wording can be tricky to suit both selectors. But I think it might be worth it to reduce the amount of tests you will need to maintain.

