import * as Actions from './Actions';

export const StarTweetOld = (tweetId) => ({
    type: Actions.StarTweet,
    tweetId,
});

export const StarTweet = (tweetId) => (dispatch, getState) => {
    dispatch({
        type: `${Actions.StarTweet}/Begin`,
        tweetId,
    });
    tweetApi.starTweet(tweetId)
        .then((result) => {
            dispatch({
                type: `${Actions.StarTweet}/Success`,
                result,
            });
            return result;
        })
        .catch((error) => {
            dispatch({
                type: `${Actions.StarTweet}/Failure`,
                error,
            });
            return error;
        })
};
