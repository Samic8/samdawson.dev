---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React", "Jest"]
date: "2019-12-24"
updated: "2020-05-25"
---

React-redux hooks like `js,useSelector()` and the `js,connect()` can have the same outcomes. The main difference between them is their ability to _nudge_ (guide) the way you write your components. Understanding what each of them _optimizes for_ is essential to helping you choose between them.

<br/>

<table>
  <thead>
    <th class="mobile-table">Hooks (useSelector etc)</th>
    <th class="mobile-table-header">Connect</th>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 5px; vertical-align: top" class="mobile-table">
        <li><a href="#less-boilerplate">Less boilerplate</a></li>
        <li><a href="#hooks-testing">Couples components to redux</a></li>
        <li><a href="#hooks-testing">Components are more effort to test</a></li>
        <li><a href="#hooks-testing"><i>Nudged</i> to have more test coverage</a></li>
        <li><a href="#unit-testing-and-separation-of-concerns">Less separation of concerns</a></li>
        <li><a href="#the-zombie-children-problem">Potential "Zombie Children" problem</a></li>
      </td>
      <td style="padding: 5px; vertical-align: top" class="mobile-table">
        <li class="mobile-table-header-replace" style="text-align: center; font-weight: bold">Connect</li>
        <li><a href="#connect-function-testing">More boiler plate</a></li>
        <li><a href="#connect-function-testing"><i>Nudged</i> to have less test coverage</a></li>
        <li><a href="#connect-function-testing">"Inner" components themselves are simpler and easier to test</a></li>
        <li><a href="#connect-function-testing">Option to include redux in your component tests</a></li>
        <li><a href="#better-performance-optimizations-by-default">Better performance optimizations by default</a></li>
      </td>
    </tr>

  </tbody>
<table>

## Unit testing and separation of concerns

A lens we can use to understand the differences between hooks and the `js,connect()` is unit tests: How they differ for each and in-turn what direction of code style they _nudge_ you towards.

It becomes clear how organized your code is by its concerns when writing tests for it. When following the [_Separation of concerns_](https://simplicable.com/new/separation-of-concerns) principle your code becomes easier to test and reuse. There's a spectrum of _Separation_ where maintainability becomes a problem at the extreme ends.

![Separation of Concerns Spectrum](./seperation-concerns-redux.svg)

When "Not Separated" we have large files where it's hard to reuse any one piece.

Redux hooks such as `js,useSelector()` reduce separation because the components include the redux glue code. This can seem ironic because React hooks are a tool to help with separation and code reuse, but in react-redux they do couple redux to our components more than `js,connect()`.

When "Very Separated" we have small pieces of code and it's a nightmare to figure out how they all work together.

Neither fall at the extreme ends.

### `js,connect()` testing

When making use of the `js,connect()` our component code is _separated_ into two parts. The first being what we will call the inner component, this component on its own is unaware that redux even exists.

The second is the glue code written by `js,connect()`, it _glues_ redux and our inner component together through the use of a Higher Order Component.

Let's write some tests for this `js,connect()` example:

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.js javascript 1-18,62-82 GITHUB-EMBED

The inner component we can test independent of redux because of its _separation_. We don't have this option with Redux hooks because the glue code is within the component.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.test.js javascript 1-10,21 GITHUB-EMBED

Like we would do with a Redux hooks component, we can also test the inner and Redux glue code together by testing the component returned by the connect function.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.test.js javascript 6,15-21 GITHUB-EMBED

**Note:** The redux store is setup in the imported [test-util](https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/test-util.js) which allows the insertion of the initial state for convenience.

This test is more comprehensive because it tests more lines code. Testing more lines of code is not always better, the glue code is minimal and if you want to gamble with not testing it your tests will be simpler but less complete.

Different components may be better tested with either approach.

### Hooks testing

When using Redux Hooks we are _nudged_ towards testing components that include their glue code like the second `js,connect()` example.

Using Redux hooks does not mean you can't write components that are unaware of Redux, you should do that whenever possible.

The Redux hooks version of the same component:

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.js javascript 1-14,60 GITHUB-EMBED

With Redux hooks we are _nudged_ towards writing tests that are inclusive of redux (glue code). Our tests will normally include redux state:

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.test.js javascript 1-13 GITHUB-EMBED

We end up with less flexibility but it _nudges_ us towards writing more comprehensive tests.

I am using the word _nudge_ here again because it does not force us to test components that include Redux glue code. We could break this component into two components, one that includes Redux hooks and another that receives props. But at that point we are replicating the purpose of `js,connect()`, so we may as well use it.

## Better performance optimizations by default

`js,connect()` won't re-render the component passed to it unless the props change. Components using Redux hooks can achieve the same functionality by making use of the [React.memo](https://reactjs.org/docs/react-api.html#reactmemo).

```jsx
function CounterUseSelector({ allowValueChange }) {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  // ...
}

export default React.memo(CounterUseSelector)
```

`js,useSelector()` will cause re-renders if the value it produces has changed. When returning an object be aware that unless it's the same object by reference equality the component will re-render even if the objects properties are the same. You can get around this by always returning the same object.

What approach truly give your app better performance is best left decided to [actual testing](/article/js-perf-assumptions).

## Less boilerplate

Using React hooks `javascript,useSelector()` forgoes the need to use the connect function and embeds that logic within the components themselves. The trade-off is a reduction on the _Separation of Concerns_ spectrum and the need to be aware of when to use [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) to get the same performance optimizations.

## Read the docs for a more in-depth understanding

This article provides a framework to compare the approaches through the theme of _nudging_. But to truly get an understanding of the details of the hooks read the [official documentation](https://react-redux.js.org/api/hooks).

### The "Zombie Children" problem

The docs go into [detail about a problem](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children) that can arise through Redux hook usage. The docs have a lot of information on this issue but it's hard to grasp exactly how it would affect your code. [Let me know](https://twitter.com/sam__dawson) if you would like a video tutorial on this problem.

## Conclusion

Understand what you are _optimizing for_ and choose the method that best suits that. If you don't know what that is and just want to get started using React-Redux I recommend the hooks approach.

You might choose to not confine yourself to using the `js,connect()` or Redux hooks. If you don't make a decision upfront you might be creating more decision fatigue because it's not always clear why one method is a better approach over another. As we have seen in this article the differences are subtle.

## Additional Resources

- [Full Code examples are from this article](https://codesandbox.io/s/github/Samic8/react-redux-use-selector-vs-connect)
- [Thoughts on React Hooks, Redux and Separation of Concerns](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/)
