# Exercise 4

// WORKSHOP_START
`subscribe` is responsible for broadcasting when state changes occur. We must first identify when state changes occur
and second have a way to register callbacks to be processed when the state changes.

First, in order to determine when state changes occur we should compare the current state to the new state produced by reducers.
Hint: How we compare can shed light into why we don't want to mutate the state directly.

Second, in order to register callbacks we need a place to keep track of the registered callbacks. We can create a list
of subscriber callbacks called, `subscribers`. Now `subscribe` can accept a callback as a parameter and add it to the list
of known subscribers.

// WORKSHOP_END

// FINAL_START
`subscribe` is responsible for broadcasting when state changes occur. We must first identify when state changes occur
and second have a way to register callbacks to be processed when the state changes.

First, in order to determine when state changes occur we should compare the current state to the new state produced by reducers.
Hint: How we compare can shed light into why we don't want to mutate the state directly.

Second, in order to register callbacks we need a place to keep track of the registered callbacks. We can create a list
of subscriber callbacks called, `subscribers`. Now `subscribe` can accept a callback as a parameter and add it to the list
of known subscribers.
// FINAL_END
