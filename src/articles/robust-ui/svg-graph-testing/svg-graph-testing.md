---
title: "How to unit test SVG Graphs"
slug: svg-graph-testing
techs: ["React", "Jest"]
date: "2020-06-11"
---

This article is walk-through an example of how to test a React bar graph component with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

The gold standard for component testing is to test user behaviour instead of code implementation. Unfortunately with SVG graphs if we want to do low level tests on the individual components implementation testing comes with the territory, because the graph is _implemented_ as an SVG. That's OK, the trade-off is that we create robust graph code that will withstand time.

Like all code, graphs can become complex over time as more and more features get added. Graphs also tend to be reused many times for different data sets, and they usually succumb to many flags -- with props like "shouldShowAverage" which adds a line to a bar graph.

You've heard it a million times -- don't reinvent the wheel -- this is especially relevant with graphs. There are great open source libraries out there for graphs, but eventually you might out grown them and need something more custom. Writing solid tests gives you the flexibility to swap out libraries or write your own with lower level libraries like [D3](https://d3js.org/) in the future.

Because we are testing implementation -- the SVG -- it's never going to be as simple as swapping libraries and the tests all pass. Thats a trade off we are intentionally making, as we will see in the following example we will write tests with that in mind. (todo elaborate?)

## Writing tests for a bar graph

Let's take my own advice and start with a charting library. We are going to be using [recharts](https://github.com/recharts/recharts) to create a simple bar chart. For future flexibility we are also going to wrap the chart in our own custom component, everywhere that uses this type of graph will use this component.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/576e75028d462f01416f80f8bb0fc7699d57ea25/src/components/BarGraph/index.js javascript GITHUB-EMBED

Its important that the props include width and height so that our tests can hard-code them. How the rechart components are used within our `BarChart` component are not important for the purposes of this article.

We always need setup code in our tests, heres some:

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/576e75028d462f01416f80f8bb0fc7699d57ea25/src/components/BarGraph/BarGraph.test.js javascript 1-18,48-49 GITHUB-EMBED

It's not ideal that we need to create the graphContainer variable, we will see why it's needed in a moment.

Visually -- although we won't see it in these tests -- the bar graph with the variables we have set up would look like this:

![Bar Chart Example](./bar-graph.png)

First up let's get bars under tests. Jests test.each is super handing for testing graphs, we can display the data we want to test for the bars in a tabular format.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/576e75028d462f01416f80f8bb0fc7699d57ea25/src/components/BarGraph/BarGraph.test.js javascript 5-6,20-34,48-49 GITHUB-EMBED

Recharts bars are not immediately rendered so we need to do `await wait` which can cause delayed test failures because Jest will wait a few moments for the `expect` assertions to pass, on successful test runs it won't cause much of a slow down though.

Here we also make use of the `graphContainer` element that we set earlier. As you will see in the next test, we will use `screen` instead. [Screen](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen) makes tests simpler as we don't have to worry about destructing or scoping variables, but it's not available when you need to make use of `querySelector`. Having to use `querySelector` or `querySelector` in your tests should be a red flag that your testing implementation, but as we already discussed it's a necessary evil when testing SVG graphs.

We are using getAttribute to test specifics of the bars. Notice how we are not trying to capture every attribute, this allows the implementation some flexibility to change without our tests breaking.

Next let's add some tests for the "ticks" which are the value marks to the left of the bar graph.

GITHUB-EMBED https://github.com/Samic8/robust-ui-examples/blob/576e75028d462f01416f80f8bb0fc7699d57ea25/src/components/BarGraph/BarGraph.test.js javascript 5-6,36-47,48-49 GITHUB-EMBED

Like the bars we have just choose a few key aspects of the ticks we want to test. We have also introduced another implementation detail, its that the parentNode handles the positioning, not the `tspan` that contains the text, again, not ideal but we get to have solid tests for the graph.

We can also make use of `screen` because we are querying the elements in a user accessible way (not implementation), which the [Testing Library](https://testing-library.com/docs/intro) philosophy approves of. Just because we break the rules of Testing Library once, we don't have to for all of our tests.

It's worth considering the [snapshot testing tool](/article/the-snapshot-testing-tool) which is what `toMatchSnapshot` is doing below:

```javascript
expect(screen.getByText(value)).toMatchSnapshot()
```

The problem though is now we are heavily relying on exact implementation and our tests will break if small details change which are potentially not critical. It's worth considering if the element attributes are minimal and you can accurately describe what your testing in the tests description, which in this example might be hard. The saved snapshot from the previous assertions creates the output:

```javascript
exports[
  `BarGraph given two data points at a particular size displays 15 in the correct position 1`
] = `
<text
  class="recharts-text recharts-cartesian-axis-tick-value"
  fill="#666"
  height="960"
  stroke="none"
  text-anchor="end"
  width="60"
  x="72"
  y="740"
>
  <tspan
    dy="0.355em"
    x="72"
  >
    15
  </tspan>
</text>
`
```

## What about TDD (Test Driven Development)?

Yeah about that... it's hard with graphs, especially as showcased in this example where are using a external library. I recommend first writing (or including a library) the code for a section of your graph, maybe the bars first, making sure it visually looks right, then writing your tests for that section.

You can write test with empty values:

```javascript
const textNode = screen.getByText(value).parentNode
expect(textNode.getAttribute("y")).toBe("")
expect(textNode.getAttribute("x")).toBe("")
```

The tests will error when ran:

```
BarGraph › given two data points at a particular size › displays 15 in the correct position

    expect(received).toBe(expected) // Object.is equality

    Expected: ""
    Received: "740"
```

Then you can copy and paste the correct values. Which is a manual version of what snapshot testing does automatically, so you could just use that if you prefer, and instead of capturing the entire element, capture specific data points.

```javascript
const textNode = screen.getByText(value).parentNode
expect(textNode.getAttribute("y")).toMatchSnapshot()
expect(textNode.getAttribute("x")).toMatchSnapshot()
```

## Conclusion

Although testing implementation goes against Testing Libraries philosophy it's worth being a bit awkward to make your graph code robust and future proof. SVG graphs are [not particular accessible](https://tink.uk/accessible-svg-line-graphs/) themselves, so it's hard to query by user accessible features, which is what Testing Library wants you to do.

TODO how to make graph auto size?
