---
title: "React-redux: react.memo and useSelector vs connect"
slug: react-redux-use-selector-vs-connect
techs: ["React"]
date: "2019-12-24"
---

When implementing react-redux for the first time I was a bit puzzled on whether to use the new [hooks](https://react-redux.js.org/api/hooks) or existing [connect](https://react-redux.js.org/api/connect) API. The react-redux library at the time of writing this does not seem to be pushing hooks as the new forward and has not deprecated the connect API.

So I thought that there must be a downside to using the hooks API since it's not being promoted as the new way to use react-redux. Instead, the documentation just presents both options and does not seem to have a strong opinion on which one you should use.

Using [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) and [useSelector](https://react-redux.js.org/api/hooks#useselector) provides all of the same benefits of the connect API. It will only re-render the component when the data useSelector hook is concerned with changes. My theory of the downside of using hooks was if the component's props don't change but the redux stores data does the component would not re-render.

It turns out that the useSelector hook does have a way of forcing re-renders of the component where the hook is used. I found this out by digging through the source code [here](https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.js#L15). The re-rendering functionality is mentioned in the [documentation for useSelector](https://react-redux.js.org/api/hooks#useselector). I'm not sure If I just glanced over this point when reading the documentation or I just didn't know the forcing re-renders in react with useState was a possibility.
