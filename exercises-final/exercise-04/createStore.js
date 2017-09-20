export default (reducer) => {
    let state;
    const subscribers = [];
    const store = {
        dispatch: (action) => {
            const newState = reducer(state, action);
            // GOTCHA: The line below is why reducers should **NEVER** modify the incoming state directly,
            // but instead make a shallow copy of it with the mutations mixed in.
            // Why? Otherwise the equality check to determine if the state is different (line below) will always be false!
            const stateChanged = state !== newState;
            state = newState;
            if (stateChanged) {
                subscribers.forEach((subscriber) => subscriber());
            }
        },
        getState: () => {
            return state;
        },
        subscribe: (callback) => {
            subscribers.push(callback);
        },
    };

    return store;
};
