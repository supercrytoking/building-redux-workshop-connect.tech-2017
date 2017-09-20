import {applyMiddleware} from './../redux';

test('applying middleware accepts middleware argument array, returns function accepting createStore which then returns an augmented createStore function', () => {
    const internalCreateStore = getCreateStore();
    const reducer = jest.fn();
    const augmentCreateStore = applyMiddleware();
    const createStore = augmentCreateStore(internalCreateStore);
    const store = createStore(reducer);

    expect(internalCreateStore).toHaveBeenCalledTimes(1);
    expect(internalCreateStore).toHaveBeenCalledWith(reducer);
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.subscribe).toBeDefined();
});

test('applying no middleware returns a non-augmented store (output from createStore)', () => {
    const storeOriginalDispatch = jest.fn();
    const internalCreateStore = getCreateStore(storeOriginalDispatch);
    const reducer = jest.fn();
    const augmentCreateStore = applyMiddleware();
    const createStore = augmentCreateStore(internalCreateStore);
    const store = createStore(reducer);
    store.dispatch(getAction());

    expect(storeOriginalDispatch).toHaveBeenCalledTimes(1);
    expect(storeOriginalDispatch).toHaveBeenCalledWith(getAction());
});

test('applied middleware is called when dispatching actions', () => {
    const storeOriginalDispatch = jest.fn();
    const internalCreateStore = getCreateStore(storeOriginalDispatch);
    const reducer = jest.fn();
    const middlewareAugmentedDispatch = jest.fn();
    const middlewareAcceptingDispatch = jest.fn()
        .mockReturnValue(middlewareAugmentedDispatch);
    const middleware = jest.fn()
        .mockReturnValue(middlewareAcceptingDispatch);
    const augmentCreateStore = applyMiddleware(middleware);
    const createStore = augmentCreateStore(internalCreateStore);
    const store = createStore(reducer);
    store.dispatch(getAction());

    expect(middlewareAcceptingDispatch).toHaveBeenCalledTimes(1);
    expect(middlewareAcceptingDispatch).toHaveBeenCalledWith(storeOriginalDispatch);
    expect(middlewareAugmentedDispatch).toHaveBeenCalledWith(getAction());
});

// ---

function getCreateStore(dispatch = jest.fn()) {
    return jest.fn()
        .mockReturnValue({
            dispatch: dispatch,
            getState: jest.fn(),
            subscribe: jest.fn(),
        });
}
function getAction() {
    return {
        type: 'StarTweet',
        tweetId: 'Tweet:12',
    };
}
