import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Provider extends Component {
    static propTypes = {
// FINAL_START
        store: PropTypes.shape({
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired,
            subscribe: PropTypes.func.isRequired,
        }).isRequired,
// FINAL_END
    };

    static childContextTypes = {
// FINAL_START
        store: PropTypes.shape({
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired,
            subscribe: PropTypes.func.isRequired,
        }).isRequired,
// FINAL_END
    };

    getChildContext() {
// FINAL_START
        return {
            store: this.props.store,
        };
// FINAL_END
    }

    render() {
        return this.props.children;
    }
}
