import createStore from '../createStore';

test('createStore is defined', () => {
    expect(createStore).toBeDefined();
});

test('created stores have a getState function', () => {
    const store = createStore();
    expect(store.getState).toBeDefined();
    expect(() => store.getState()).not.toThrow();
});

test('created stores have a dispatch function', () => {
    const store = createStore(getMockReducer());
    expect(store.dispatch).toBeDefined();
    expect(() => store.dispatch()).not.toThrow();
});

test('created stores have subscribe function', () => {
    const store = createStore();
    expect(store.subscribe).toBeDefined();
    expect(() => store.subscribe()).not.toThrow();
});

test('created stores can retrieve the state', () => {
    const store = createStore();
    expect(store.getState()).toEqual(undefined);
});

test('dispatch passes action parameter and current state through reducer to set the new state', () => {
    const newState = 'new state';
    const reducer = getMockReducer(newState);
    const action = {
        type: 'Tweet/Star',
        tweetId: 'Tweet:1234',
    };
    const store = createStore(reducer);
    store.dispatch(action);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledWith(undefined, action);
    expect(store.getState()).toEqual(newState);
});

// ---

function getMockReducer(newState = {}) {
    return jest.fn().mockReturnValue(newState);
}
