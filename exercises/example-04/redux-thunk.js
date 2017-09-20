const mapDispatchToProps = (dispatch) => ({
   showUserTweets: (userId) => dispatch(actionCreators.showUserTweets(userId)),
});

const mergeProps = (stateProps, dispatchProps, props) => ({
    // ...
    onSelect: (evt, userId) => dispatchProps.showUserTweets(userId),
    // ...
});
