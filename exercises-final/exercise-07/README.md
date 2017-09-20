# Exercise 7

// WORKSHOP_START
React-Redux is the glue between React and Redux. It exposes a Component called `Provider` which exposes the redux store to
the component tree via React's `context`.

To accomplish this our HOC must implement `getChildContext` and return the redux store provided via props.

Because we have provided a `getChildContext`, there is a requirement to implement the static member `getContextTypes`.
 This will enforce the shape of the context object using `PropTypes` API.
// WORKSHOP_END

// FINAL_START
React-Redux is the glue between React and Redux. It exposes a Higher Order Component called `Provider` which exposes the redux store to
the component tree via React's `context`.

To accomplish this our HOC must implement `getChildContext` and return the redux store provided via props.

Because we have provided a `getChildContext`, there is a requirement to implement the static member `getContextTypes`.
 This will enforce the shape of the context object using `PropTypes` API.
// FINAL_END
