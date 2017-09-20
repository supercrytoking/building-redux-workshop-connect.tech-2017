export default (reducer) => {
    let state = null;
    const store = {
        dispatch: () => {
        },
        getState: () => {
            return state;
        },
        subscribe: () => {
        },
    };

    return store;
};
