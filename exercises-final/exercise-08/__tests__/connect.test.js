import React from 'react';
import {shallow} from 'enzyme';
import connect from '../connect';

test('given no parameters, it does not alter the props passed to the component', () => {
    const FakeComponent = getFakeComponent();

    const ConnectedComponent = connect()(FakeComponent);
    const mountedConnectedComponent = renderConnectedComponent(ConnectedComponent, getProps());
    expect(mountedConnectedComponent.props()).toEqual(getProps());
});

test('state is given to mapStateToProps', () => {
    const mapStateToProps = jest.fn();
    const FakeComponent = getFakeComponent();

    const ConnectedComponent = connect(mapStateToProps)(FakeComponent);
    renderConnectedComponent(ConnectedComponent);
    expect(mapStateToProps).toBeCalledWith(getState())
});

test('dispatch is given to mapDispatchToProps', () => {
    const mapStateToProps = jest.fn();
    const mapDispatchToProps = jest.fn();
    const FakeComponent = getFakeComponent();

    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(FakeComponent);
    renderConnectedComponent(ConnectedComponent);
    expect(mapDispatchToProps.mock.calls[0][0]).toEqual(getDispatch());
});

test('without a mergeProps provided, it replaces props to the connected component with the merger of the state props, then the dispatch props, and finally the passed in component props', () => {
    const mapStateToProps = jest.fn().mockReturnValue(getStateProps());
    const mapDispatchToProps = jest.fn().mockReturnValue(getDispatchProps());
    const FakeComponent = getFakeComponent;

    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(FakeComponent);
    const mountedConnectedComponent = renderConnectedComponent(ConnectedComponent, getProps());
    expect(mountedConnectedComponent.props()).toEqual(getMergedProps());
});

test('mergeProps is given state props, dispatch props, and component props', () => {
    const mapStateToProps = jest.fn().mockReturnValue(getStateProps());
    const mapDispatchToProps = jest.fn().mockReturnValue(getDispatchProps());
    const props = getProps();
    const mergeProps = jest.fn();
    const FakeComponent = getFakeComponent;

    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(FakeComponent);
    renderConnectedComponent(ConnectedComponent, getProps());
    expect(mergeProps.mock.calls[0][0]).toEqual(getStateProps());
    expect(mergeProps.mock.calls[0][1]).toEqual(getDispatchProps());
    expect(mergeProps.mock.calls[0][2]).toEqual(props);
});

test('output of provided mergeProps function is applied as the props to the connected component', () => {
    const mapStateToProps = jest.fn();
    const mapDispatchToProps = jest.fn();
    const mergeProps = jest.fn().mockReturnValue(getMergedProps());
    const FakeComponent = getFakeComponent;

    const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(FakeComponent);
    const mountedConnectedComponent = renderConnectedComponent(ConnectedComponent);
    expect(mountedConnectedComponent.props()).toEqual(getMergedProps());
});

// ---

function getFakeStore() {
    return {
        dispatch: getDispatch(),
        getState: jest.fn().mockReturnValue(getState()),
        subscribe: jest.fn(),
    };
}
function getFakeComponent() {
    return () => <span>Hello world</span>;
}
function getMergedProps() {
    return {
        dispatchProp: 1,
        overrideMeFromComponentProp: 2,
        overrideMeFromDispatchProp: 2,
        prop: 1,
        stateProp: 1,
    };
}
function renderConnectedComponent(Component, props = {}) {
    const store = getFakeStore();
    return shallow(<Component {...props} />, {
        context: {
            store,
        },
    });
}
function getStateProps() {
    return {
        overrideMeFromComponentProp: 1,
        overrideMeFromDispatchProp: 1,
        stateProp: 1,
    };
}
function getProps() {
    return {
        overrideMeFromComponentProp: 2,
        prop: 1,
    };
}
function getState() {
    return {
        stateValue: 1,
    };
}
const dispatch = jest.fn();
function getDispatch() {
    return dispatch;
}
function getDispatchProps() {
    return {
        dispatchProp: 1,
        overrideMeFromDispatchProp: 2,
    };
}
