import React from 'react';
import {shallow} from 'enzyme';
import Provider from '../Provider';

test('it passes down the store in the child context', () => {
    const store = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        subscribe: jest.fn(),
    };
    const provider = shallow((
        <Provider
            store={store}
        >
            <h1>Tweet</h1>
        </Provider>
    ));
    expect(provider.instance().getChildContext()).toEqual({
        store,
    });
});
