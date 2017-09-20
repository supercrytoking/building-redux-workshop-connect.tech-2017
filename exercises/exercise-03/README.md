# Exercise 3

// WORKSHOP_START
Redux transitions from a current state to a new state by processing actions by the reducers.
The root reducer is provided to the `createStore` function as a parameter and an `action` is provided to the `dispatch`
function that we exposed as part of the store's public API.

The reducer function produces a new state by applying the current state and action as arguments to it's invocation.

In order for the store's current state to reflect the new state we must re assign the `state` variable to the new state.
// WORKSHOP_END

// FINAL_START
Redux transitions from a current state to a new state by processing actions by the reducers.
The root reducer is provided to the `createStore` function as a parameter and an `action` is provided to the `dispatch`
function that we exposed as part of the store's public API.

The reducer function produces a new state by applying the current state and action as arguments to it's invocation.

In order for the store's current state to reflect the new state we must re assign the `state` variable to the new state.
// FINAL_END
