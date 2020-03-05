---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React"]
date: "2019-12-24"
---

When implementing react-redux for the first time I was a bit puzzled on whether to use the new [hooks](https://react-redux.js.org/api/hooks) or existing [connect](https://react-redux.js.org/api/connect) API. The react-redux library documentation at the time of writing this does not seem to be strongly suggesting one method over the other.

To me, it seemed that using [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) and [useSelector](https://react-redux.js.org/api/hooks#useselector) would provide all of the same benefits of the connect API. I thought maybe if a component's props don't change and the redux state does change, that component would not re-render because of React.memo.

It turns out that the useSelector hook does have a way of forcing re-renders within the component where useSelector is used. I found this out by digging through the source code [here](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L15). The re-rendering functionality is also mentioned in the [documentation for useSelector](https://react-redux.js.org/api/hooks#useselector).

Mark Erikson has some thoughts on the [tradeoffs when using hooks vs connect](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/) for separation of concerns. Using hooks couples your components to the redux store by direct usage of dispatch and useSelector.

While the connect API abstracts selecting state and dispatch through **mapStateToProps** and **mapDispatchToProps** by transforming state and dispatch into something more specific for each component. Which may make unit testing the component itself easier.
