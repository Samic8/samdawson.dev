---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React"]
date: "2019-12-24"
updated: "2020-05-24"
---

Mostly redux hooks and connect have similar outcomes (outcomes of what). They can both perform the same functionality. The main difference between them is the ability to nudge (guide) the way you write your component code, understanding what each of them optimises for will help you make your decision on what one to use.

For each of them you can push away from the code they want to guide you towards, but it's best not to the fight the API and instead choose the one that optimises for what you want to optimise for.

<table>
  <thead>
    <th>Hooks (useSelector etc)</th>
    <th>Connect</th>
  </thead>
  <tbody>
    <tr>
      <td>
        - Less boilerplate.
        - Couples components to redux
        - Components are harder to test, can easily just test the "inner" component without connection to redux
        - Tests cover more code, including redux. More comprehensive.
        - Potential "Zombie Children" problem
        - Reduction of separation of concerns?
        - Less moving parts, easier to reason about each component.
      </td>
      <td>
        - More boiler plate
        - Likely less test coverage
        - Components themselves are simpler and easier to test
        - Can test connnected component the same as useSelector
        - Leads to exporting "private" component
        - [Better performance optimizations by default](#better-performance-optimizations-by-default)
      </td>
    </tr>

  </tbody>
<table>

## Unit testing and separation of concerns

A handy way to understand the differences between hooks and connect, is to understand how unit tests can be written for each and what direction of code style they _nudge_ you towards.

The way you write your unit tests influences how your components are organised by their concerns. When following the _Separation of concerns_ principle your code becomes easier to test and reuse. There is a spectrum of separation of concerns and there are tradeoff's along that spectrum, maintainability becomes a problem at the extreme ends of the spectrum.

Connect API is more and the hooks API is less separated by concerns. I don't think either fall at the extreme ends so you need to understand what trade offs you are making with each choice.

### Testing components using the connect function

For a **connect** component we have the option of testing both the presentational component called "CounterConnectInner" or the connected "CounterConnect" where we will need to test its connection to redux too.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.js javascript 1-18,62-82 GITHUB-EMBED

The first test example here is only concerned with the "inner" component is much simpler as we don't have to worry the redux state. The second example tests both the the component and the connection to redux, which is more comprehensive as we testing more lines of code.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.test.js javascript 1-21 GITHUB-EMBED

The redux provider is setup in the test-util which allows the insertion on initial state for convenience when testing test.

### Testing components using react-redux hooks

For a component using useSelector we don't have as many options the way hooks work we are _nudged_ towards testing components that are connected to redux. When you use useSelector or any other redux hooks in a component we can consider it "connected" to redux, even though we are not using the explicit connect function.

This version of the component is connected to redux using the React Redux hooks.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.js javascript 1-14,60 GITHUB-EMBED

When writing tests for it because we can't separate out the "inner" component as easily we are _nudged_ towards writing tests that are connected to the redux store.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.test.js javascript 1-13 GITHUB-EMBED

We end up with less flexibility but it _nudges_ us to writing to more comprehensive tests that include redux state.

I am using the word _nudge_ here again, because it does not force us to test components using hooks in this way. We could break this component into two components, one that uses the hooks and another that just receives props. But at that point we are replicating the connect functions purpose, so we may as well just use it because we are not confided to using only one approach unless you have a project style-guide that is very strict about using hooks or connect exclusively. If you are in that situation it might be worth starting a discussion after the decision makers have read this article.

## Better performance optimizations by default

The winner here is the connect function, since it won't re-render connected components unless the props included the props mapped from state are changed. Components using React Redux hooks can achieve the same functionality by making use of the [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) API

Whether this will truly give your app better performance is best left decided to [actual testing](/article/js-perf-assumptions).
