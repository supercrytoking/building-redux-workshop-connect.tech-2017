// Redux-thunk middleware implementation.
// Middleware take the form of a function: (store) => (priorDispatchFunction) => (action) => priorDispatchFunction(action);
export default (store) =>
    // input is previous store.dispatch function
    (next) =>
        // new dispatch function; accepting an action object
        (action) => {
            if (typeof action !== 'function') {
                // when action is not a function, pass it along to the next dispatch middleware
                next(action);
                return;
            }
            // Otherwise, invoke the action function; providing it with the store's dispatch and getState functions
            const thunkOutput = action(store.dispatch, store.getState);
            // Pass the output to the next dispatch
            next(thunkOutput);
        };
