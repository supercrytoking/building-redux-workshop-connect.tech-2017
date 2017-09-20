import createStore from '../redux';

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
        type: 'Tweet/Star'
    };
    const store = createStore(reducer);
    store.dispatch(action);
    expect(reducer).toHaveBeenCalledTimes(1);
    expect(reducer).toHaveBeenCalledWith(undefined, action);
    expect(store.getState()).toEqual(newState);
});

test('subscribe will register callbacks that are executed when state changes', () => {
    const newState = 'new state';
    const reducer = getMockReducer(newState);
    const subscribers = getSubscribers(5);
    const store = createStore(reducer);
    subscribers.forEach(store.subscribe);
    store.dispatch("an action");
    store.dispatch("an action");
    store.dispatch("an action");
    subscribers.forEach((subscriber) => {
        expect(subscriber).toHaveBeenCalledTimes(1);
    });
});

test('executed subscribers are called after the new state has been applied', () => {
    const newState = 'new state';
    const reducer = getMockReducer(newState);
    const store = createStore(reducer);
    const subscriber = () => expect(store.getState()).toEqual(newState);
    store.subscribe(subscriber);
    store.dispatch("an action");
});

// ---

function getMockReducer(newState = {}) {
    return jest.fn().mockReturnValue(newState);
}
function getSubscribers(n = 3) {
    const subscribers = new Array(n);
    return subscribers.map(() => jest.fn());
}
