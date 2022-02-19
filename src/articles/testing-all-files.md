---
title: Do all files need tests?
slug: testing-all-files
techs: ["Javascript", "Testing"]
date: "2022-02-19"
---

It depends.

Is the file covered by another integration test?

Code coverage tools are a essential for checking if the file is covered by other integration tests.

If you discover that the file is partially covered. Then ask do the uncovered lines ever get called in real world usage?

If so you have two options.

Test that line from the integration test **or** if it makes that integration test too complicated then write a test for the file in question to cover that case.

If the uncovered line is never called in real world usage, remove it!
