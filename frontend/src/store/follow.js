const LOAD_FOLLOWINGS = 'follows/LOAD_FOLLOWINGS';
const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';
const CREATE_FOLLOW = 'follows/CREATE_FOLLOW';
const CREATE_FOLLOWING = 'follows/CREATE_FOLLOWING';
const DELETE_FOLLOW = 'follows/DELETE_FOLLOW';

const loadFollowings = followings => ({
    type: LOAD_FOLLOWINGS,
    payload: followings
});

const loadFollowers = followers => ({
    type: LOAD_FOLLOWERS,
    payload: followers
});

const createFollow = follow => ({
    type: CREATE_FOLLOW,
    payload: follow
});

const deleteFollow = follow => ({
    type: DELETE_FOLLOW,
    payload: follow
})

const createFollowing = follow => ({
    type: CREATE_FOLLOWING,
    payload: follow
});

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
};

export const followUser = (followId, userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"user_id": userId, "follower_id": followId})
    });

    if(response.ok) {
        const follow = await response.json();
        dispatch(createFollow(follow));
        return follow;
    }
};

export const addToFollowing = (followId, userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"user_id": userId, "follower_id": followId})
    });

    if(response.ok) {
        const follow = await response.json();
        dispatch(createFollowing(follow));
        return follow;
    }
};

export const unfollowUser = (followId, userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"user_id": userId, "follower_id": followId})
    });

    if(response.ok) {
        const unfollow = await response.json();
        dispatch(deleteFollow(unfollow));
        return unfollow
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
        case CREATE_FOLLOW:
            const createState = JSON.parse(JSON.stringify(state));
            createState.followers[action?.payload.id] = action?.payload;
            return createState;
        case CREATE_FOLLOWING:
            const creatingState = JSON.parse(JSON.stringify(state));
            creatingState.followings[action?.payload.id] = action?.payload;
            return creatingState;
        case DELETE_FOLLOW:
            const deleteState = JSON.parse(JSON.stringify(state));
            delete deleteState.followers[action.payload.id];
            return deleteState;
        default:
            return state;
    }
}
