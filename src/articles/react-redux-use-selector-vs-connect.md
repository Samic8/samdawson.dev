---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React"]
date: "2019-12-24"
updated: "2020-05-25"
---

Redux hooks and connect can have the same functional outcomes. The main difference between them is the ability to _nudge_ (guide) the way you write your component code. Understanding what each of them optimizes for will help you make your decision on what one to use.

For both the connect function and hooks you can ignore _the nudge_ but it's best not to fight the API and instead choose the one that optimizes for the code style you want.

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
        <li><a href="#testing-components-using-react-redux-hooks">Couples components to redux</a></li>
        <li><a href="#testing-components-using-react-redux-hooks">Components are more effort to test</a></li>
        <li><a href="#testing-components-using-react-redux-hooks"><i>Nudged</i> to have more test coverage</a></li>
        <li><a href="#unit-testing-and-separation-of-concerns">Less separation of concerns</a></li>
        <li><a href="#the-zombie-children-problem">Potential "Zombie Children" problem</a></li>
      </td>
      <td style="padding: 5px; vertical-align: top" class="mobile-table">
        <li class="mobile-table-header-replace" style="text-align: center; font-weight: bold">Connect</li>
        <li><a href="#testing-components-using-the-connect-function">More boiler plate</a></li>
        <li><a href="#testing-components-using-the-connect-function"><i>Nudged</i> to have less test coverage</a></li>
        <li><a href="#testing-components-using-the-connect-function">"Inner" components themselves are simpler and easier to test</a></li>
        <li><a href="#testing-components-using-the-connect-function">Option to include redux in your component tests</a></li>
        <li><a href="#better-performance-optimizations-by-default">Better performance optimizations by default</a></li>
      </td>
    </tr>

  </tbody>
<table>

## Unit testing and separation of concerns

A lens we can use to understand the differences between hooks and the connect function is to understand how unit tests can be written for each and what direction of code style they _nudge_ you towards.

I find that in testing code you realize how well it is organized by its concerns, you learn all of the dependencies you have introduced because now you have to mock them.

When following the [_Separation of concerns_](https://simplicable.com/new/separation-of-concerns) principle your code becomes easier to test and reuse. There is a spectrum of _Separation of Concerns_ and there are trade-offs along that spectrum, maintainability becomes a problem at the extreme ends of the spectrum. You can end up with too many small pieces of code to maintain and it's a nightmare to figure out how they all work together, or at the other end large files where it's hard to reuse any one piece.

![./seperation-concerns-redux.svg](./seperation-concerns-redux.svg)

The connect function improves separation and the hooks reduce separation. I don't think either fall at the extreme ends so you need to understand what trade-offs you are making with each choice.

### Testing components using the connect function

For a component using the connect function we have the option of testing both the component called "CounterConnectInner" which is not coupled to redux because of its inherent _separation_. The option is also available to test the redux aware "CounterConnect" where we will need to test its relationship with the redux state too.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.js javascript 1-18,62-82 GITHUB-EMBED

The first test example below is only concerned with the "inner" component which is simpler as we don't have to worry about the redux state. The second example tests both the component and its relationship to redux state, which is more comprehensive as we are testing more lines of code which includes the mapStateToProps setup code.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-connect/CounterConnect.test.js javascript 1-21 GITHUB-EMBED

The redux provider is set up in the imported [test-util](https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/test-util.js) which allows the insertion of the initial state for convenience when testing test.

### Testing components using react-redux hooks

For a component using useSelector we are _nudged_ towards testing components that are connected to redux. When you use useSelector or any other redux hooks in a component we can consider it "connected" to redux, even though we are not using the explicit connect function.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.js javascript 1-14,60 GITHUB-EMBED

When writing tests for the component using hooks, because we can't separate the "inner" component as easily we are _nudged_ towards writing tests that are connected to the redux store.

GITHUB-EMBED https://github.com/Samic8/react-redux-use-selector-vs-connect/blob/master/src/features/counter-use-selector/CounterUseSelector.test.js javascript 1-13 GITHUB-EMBED

We end up with less flexibility but it _nudges_ us to writing to more comprehensive tests that include redux state.

I am using the word _nudge_ here again because it does not force us to test components using hooks in this way. We could break this component into two components, one that uses the hooks and another that just receives props. But at that point we are replicating the connect functions purpose, so we may as well just use it.

We are not confined to using only one method, we can mix and match hooks and the connect function. Unless you have a project style-guide that is very strict about using hooks or connect exclusively. If you are in that situation it might be worth starting a discussion about why you are opting for one way over the other.

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
