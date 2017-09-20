export const applyMiddleware =
    // Function accepting middlewares.
    (...middlewares) =>
        // Function accepting a createStore function and returns a createStore function
        (createStore) =>
            // Returned createStore function which, when invoked, will return a store.
            (reducer) => {
                const store = createStore(reducer);
                const dispatch = middlewares.reduce((dispatch, middleware) => middleware(store)(dispatch), store.dispatch);

                return {
                    ...store,
                    dispatch,
                };
            };

const internalCreateStore = (reducer) => {
    let state;
    const subscribers = [];

    const store = {
        dispatch: (action) => {
            const newState = reducer(state, action);
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

// Change exported `createStore` to accept a second parameter.
// The second parameter is a function accepting a `createStore` function and returning a `createStore` function.
// The augmentedCreateStore function can be used to create the store with the provided reducer.
export default (reducer) => internalCreateStore(reducer);
