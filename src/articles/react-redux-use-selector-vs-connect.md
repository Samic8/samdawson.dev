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
      </td>
    </tr>

  </tbody>
<table>

## Unit testing and separation of concerns

A handy way to understand the differences between hooks and connect, is to understand how unit tests can be written for each and what direction of code style they nudge you towards.

The way you write your unit tests influences how your components are organised by their concerns. When following the _Separation of concerns_ principle your code becomes easier to test and reuse. There is a spectrum of separation of concerns and there are tradeoff's along that spectrum, maintainability becomes a problem at the extreme ends of the spectrum.

Connect API is more and the hooks API is less separated by concerns. I don't think either fall at the extreme ends so you need to understand what trade offs you are making with each choice.

### Connect testing

For a connect component we have the option of testing both the presentational component in this example I have called it **CounterConnectInner**, or testing the component as it is connected to redux.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/3e8c9f8033c467702c08024be3a358655736d9d1/src/features/counter-connect/CounterConnect.js javascript 1-18,62-82 GITHUB-EMBED

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/3e8c9f8033c467702c08024be3a358655736d9d1/src/features/counter-connect/CounterConnect.test.js javascript 1-21 GITHUB-EMBED
