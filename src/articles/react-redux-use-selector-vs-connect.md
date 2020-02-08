---
title: "useSelector vs connect (react-redux)"
slug: react-redux-use-selector-vs-connect
techs: ["React"]
date: "2019-12-24"
---

When implementing react-redux for the first time I was a bit puzzled on whether to use the new [hooks](https://react-redux.js.org/api/hooks) or existing [connect](https://react-redux.js.org/api/connect) API. The react-redux library documentation at the time of writing this does not seem to be strongly suggesting one method over the other.

I thought that there must be a downside to using the hooks since it's not being promoted as the new way to use react-redux. [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) and [useSelector](https://react-redux.js.org/api/hooks#useselector) seemed to provides all of the same benefits of the connect method.

My theory was if a component's props don't change but the redux stores data does the component would not re-render. It turns out that the useSelector hook does have a way of forcing re-renders of the component where the hook is used. I found this out by digging through the source code [here](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L15). The re-rendering functionality is mentioned in the [documentation for useSelector](https://react-redux.js.org/api/hooks#useselector).

Mark Erikson has some thoughts on the [tradeoffs when using hooks vs connect](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/) for separation of concerns. Using hooks couples your components to the redux store by direct usage of dispatch and useSelector.

While the connect method abstracts selecting state and dispatch through **mapStateToProps** and **mapDispatchToProps** by transforming state and dispatch into something more specific for each component. Which may make unit testing the component itself easier.

I haven't written tests for a component using connect just yet and I will have to write a few more components using both hooks and connect before I can come to any more conclusions.
