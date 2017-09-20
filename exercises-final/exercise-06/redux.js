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

export default (reducer, augmentCreateStore = applyMiddleware()) => {
    const createStore = augmentCreateStore(internalCreateStore);
    return createStore(reducer);
};
