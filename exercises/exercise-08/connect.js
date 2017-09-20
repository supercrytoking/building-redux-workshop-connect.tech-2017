import React, {Component} from 'react';
import PropTypes from 'prop-types';

const mapNothing = () => {
};
const defaultMergeProps = (stateProps, dispatchProps, props) => ({
    ...stateProps,
    ...dispatchProps,
    ...props,
});

const ConnectHOC =
        (mapStateToProps = mapNothing, mapDispatchToProps = mapNothing, mergeProps = defaultMergeProps) =>
            (ComponentToConnect) => {
                class Connect extends Component {
// FINAL_START
                    componentDidMount() {
                        this.context.subscribe(() => this.setState({}));
                    }

                    componentWillUnmount() {
                        // normally you would clean-up and unsubscribe here.
                        // redux does not have an unsubscribe API
                        // Instead, we could replace this with our own subscription mechanism that wraps the store.subscribe and enables unsubscribing.
                        // This is beyond the scope of the workshop, but feel free to tweet @andrew_codes. I'm more than happy to remote pair and discuss the approach.
                    }

// FINAL_END
                    render() {
// FINAL_START
                        const store = this.context.store;
                        const stateProps = mapStateToProps(store.getState());
                        const dispatchProps = mapDispatchToProps(store.dispatch);
                        const finalProps = mergeProps(stateProps, dispatchProps, this.props);

// FINAL_END
                        return (
                            <ComponentToConnect
// WORKSHOP_START
                                {...this.props}
// WORKSHOP_END
// FINAL_START
                                {...finalProps}
// FINAL_END
                            />
                        );
                    }
                }

                Connect.displayName = `Connect(${ComponentToConnect.displayName})`;
                Connect.propTypes = ComponentToConnect.propTypes;
                Connect.contextTypes = {
                    store: PropTypes.shape({
                        dispatch: PropTypes.func.isRequired,
                        getState: PropTypes.func.isRequired,
                        subscribe: PropTypes.func.isRequired,
                    }).isRequired,
                };
                return Connect;
            };

export default ConnectHOC;
