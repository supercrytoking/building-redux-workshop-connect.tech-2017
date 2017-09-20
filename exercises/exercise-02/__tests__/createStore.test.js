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
    const store = createStore();
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
    expect(store.getState()).toEqual(null);
});
