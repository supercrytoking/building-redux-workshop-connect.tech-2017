import * as Actions from './Actions';

// Example action: Star a tweet.
const starTweetAction = {
    type: Actions.StarTweet,
    tweetId: 'Tweet:12345'
};

// Example action creator to "stamp" out
// or create actions for re-use.
export const StarTweet = (tweetId) => ({
    type: Actions.StarTweet,
    tweetId,
});
