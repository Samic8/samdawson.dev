---
title: Do you need unit and end-to-end tests?
slug: do-you-need-unit-tests
techs: ["Testing"]
date: "2021-12-17"
---

You might have a suite of end-to-end tests that cover your application well and you might be thinking do we need to duplicate our tests at a unit or integration test level also?

Putting aside that end-to-end tests are often expensive to write and run. The value you get from unit or integration tests is development speed, they take a short amount of time to run which provides developers with quick feedback. These factors I would call extensibility and maintainability.

Extensive end-to-end tests alone provide confidence.

End-to-end tests plus unit and integration tests provide confidence, extensibility and maintainability.

In reality end-to-end tests often are only written to cover the critical test cases. That's were the unit or integration tests can provide confidence also, as they can fill the gaps missing from the end-to-end test cases.
