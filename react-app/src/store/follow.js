const LOAD_FOLLOWINGS = 'follows/LOAD_FOLLOWINGS';
const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';

const loadFollowings = followings => ({
    type: LOAD_FOLLOWINGS,
    payload: followings
});

const loadFollowers = followers => ({
    type: LOAD_FOLLOWERS,
    payload: followers
})

export const getFollowings = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}/followings`);

    if(response.ok) {
        const followings = await response.json();
        dispatch(loadFollowings(followings));
        return followings;
    }
};

export const getFollowers = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}/followers`);

    if(response.ok) {
        const followers = await response.json();
        dispatch(loadFollowers(followers));
        return followers;
    }
}

export default function followReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FOLLOWINGS:
            const loadingState = {...state, followings: {}};
            action.payload.followings?.forEach(user => loadingState.followings[user.id] = user);
            return loadingState;
        case LOAD_FOLLOWERS:
            const loaderState = {...state, followers: {}};
            action.payload.followers?.forEach(user => loaderState.followers[user.id] = user);
            return loaderState;
        default:
            return state;
    }
}