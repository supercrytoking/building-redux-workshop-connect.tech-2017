# Exercise 8

// WORKSHOP_START
React Redux provides a Higher Order Component called `connect` which is responsible for the following:
1. Rendering due to state changes.
2. Connecting a React Component at any level in the component tree to the store's current state
3. Binding your action creators to the store's `dispatch`

In the `componentDidMount` lifecycle event the we will pass a callback to subscribe that sets the React Component's internal state
 when the store's state changes. Setting the internal state of the React Component will force a render cycle.

Given we have access to the redux store from our `context` we can collection important information to pass along to the wrapped Component in the `render` lifecycle event.
 Using `getState` we can determine the current state of the store and using `dispatch` we can bind our action creators.
 The current state and bound action creators can be passed to the wrapped Component via props.

 `connect` accepts three parameters

 The first, `mapStateToProps` is a function that accepts the store's current state and is used to make projections from that state.
 Second, `mapDispatchToProps` is a function that accepts the store's `dispatch` and can be used to bind the `dispatch` to action creators.
 Third, `mergeProps`, provides a final hook to muck with props we will pass to the wrapped Component.

// WORKSHOP_END

// FINAL_START
1. Rendering due to state changes.

```
componentDidMount() {
    //force a render cycle when store's state changes
    this.context.subscribe(() => this.setState({}));
}
```

2. Connecting a React Component at any level in the component tree to the store's current state

```
render() {
    const store = this.context.store;
    const stateProps = mapStateToProps(store.getState());
    ...
}
```

3. Binding your action creators to the store's `dispatch`

```
render() {
    const store = this.context.store;
    ...
    const dispatchProps = mapDispatchToProps(store.dispatch);
    ...
}
```

// FINAL_END
