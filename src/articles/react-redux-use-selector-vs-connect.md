---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React", "Jest"]
date: "2019-12-24"
updated: "2020-05-25"
---

Redux hooks and the connect function can have the same outcomes. The main difference between them is their ability to _nudge_ (guide) the way you write your component code. Understanding what each of them optimizes for is essential to help you make a decision on which method is best for you and your team's code style.

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

A lens we can use to understand the differences between hooks and the connect function is to understand how unit tests can be written for each and what direction of code style they _nudge_ you towards.

I find that in testing code you realize how well it is organized by its concerns, you learn all of the dependencies you have introduced because now you have to mock them.

When following the [_Separation of concerns_](https://simplicable.com/new/separation-of-concerns) principle your code becomes easier to test and reuse.

There is a spectrum of _Separation_ where maintainability becomes a problem at the extreme ends.

![Separation of Concerns Spectrum](./seperation-concerns-redux.svg)

At the "Not Separated" end we have large files where it's hard to reuse any one piece.

At the "Very Separated" end we have too many small pieces of code and it's a nightmare to figure out how they all work together.

The connect function improves separation and the hooks reduce separation. I don't think either fall at the extreme ends so you need to understand what trade-offs you are making with each choice.

Don't get me wrong, hooks themselves are a tool to help with separation and code reuse. But in React Redux they do couple redux to our components more than the connect function.

### Connect function testing

When the connect function is used, our component code is _separated_ into two parts. The first being what we will call the "inner" component, this component on its own is unaware that redux even exists.

The second is the "glue" code, it sticks redux and our inner component together. This code is written within the function parameters mapStateToProps and mapDispatchToProps of the connect function.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.js javascript 1-18,62-82 GITHUB-EMBED

The "inner" component we can test independent of redux because of its inherent _separation_. We don't have this option by default with hooks, because hooks mix the "glue" code within the component. This is not always true as we will explore later. The first `describe` test below only tests the "inner" component without Redux.

The option is also available to test the "inner" and the redux "glue" code together by testing the component returned by the connect function, which is shown in the second `describe` block. This type of test is more comprehensive because it tests more lines code. Testing more lines of code is not always better, the "glue" code is normally minimal and if you want to gamble with not testing it, your tests will be simpler but less complete.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.test.js javascript 1-21 GITHUB-EMBED

I don't recommend doing both testing approaches like above instead, pick one and run with it. Different components may be better tested with one approach over.

**Note:** The redux store is configured in the imported [test-util](https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/test-util.js) which allows the insertion of the initial state for convenience.

### Hooks testing

When using React Redux Hooks we are _nudged_ towards testing components that include their "glue" code connecting them to redux like the second example in the connect function example.

Using React Redux hooks does not mean you can't write components that are unaware of Redux. You should do that whenever possible. It's the cases where you are writing a component that is very specific and it needs to communicate redux that you will need to include hooks to do that.

The equivalent to the connect function generated component in hooks looks like this:

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.js javascript 1-14,60 GITHUB-EMBED

With React Redux hooks we are _nudged_ towards writing tests that are inclusive of redux. Unlike the connect function which enforces the separation between the Redux glue code and our component.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.test.js javascript 1-13 GITHUB-EMBED

We end up with less flexibility but it _nudges_ us to writing to more comprehensive tests.

I am using the word _nudge_ here again because it does not force us to test components using hooks in this way. We could break this component into two components, one that uses the hooks and another that just receives props. But at that point we are replicating the connect functions purpose, so we may as well just use it.

You might choose to not confine yourself to using exclusively the connect function or hooks. If you don't make a decision upfront you might just be creating more decision fatigue as it is not always clear why one method is a better approach over another. As we have seen in this article the differences are subtle.

## Better performance optimizations by default

The winner here is the connect function since it won't re-render connected components unless the props included the props mapped from the state are changed. Components using React Redux hooks can achieve the same functionality by making use of the [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) API

Whether this will truly give your app better performance is best left decided to [actual testing](/article/js-perf-assumptions).

## Less boilerplate

Using react hooks forgoes the need to use the connect function and embeds that logic within the components themselves. The trade-off is a reduction on the _Separation of Concerns_ spectrum and the need to be are of when to use React.memo.

## Read the docs for a more in-depth understanding

This article provides a framework to compare the approaches through the theme of _nudging_. But to truly get an understanding of the details of the hooks API checkout the [official documentation](https://react-redux.js.org/api/hooks).

### The "Zombie Children" problem

The docs go into [detail about a problem](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children) that can arise through React Redux hook usage. The docs have a lot of information on this issue but it's hard to grasp exactly how it would affect your code. Let me know if you would like a video tutorial on this problem, reach out through the text box below or twitter.

## Conclusion

Understand what you are optimizing for and choose the method that best suits that. If you don't know what that is and just want to get started using React-Redux I recommend the hooks approach.

## Additional Resources

- [Full Code examples are from this article](https://codesandbox.io/s/github/Samic8/react-redux-use-selector-vs-connect)
- [Thoughts on React Hooks, Redux and Separation of Concerns](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/)
