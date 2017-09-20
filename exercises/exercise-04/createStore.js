export default (reducer) => {
    let state;
    const store = {
        dispatch: (action) => {
            state = reducer(state, action);
        },
        getState: () => {
            return state;
        },
        subscribe: (callback) => {
        },
    };

    return store;
};
