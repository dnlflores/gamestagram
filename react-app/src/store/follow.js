const LOAD_FOLLOWS = 'follows/LOAD_FOLLOWS';

const loadFollows = follows => ({
    type: LOAD_FOLLOWS,
    payload: follows
})

export const getFollows = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}/follows`);

    if(response.ok) {
        const follows = await response.json();

        console.log("THIS IS THE FOLLOWS RESPONSE FROM THE BACKEND => ", follows);
        dispatch(loadFollows(follows));
        return follows;
    }
};

export default function followReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FOLLOWS:
            const loadState ={};
            action.payload.follows?.forEach(user => loadState[user.id] = user);
            return loadState;
        default:
            return state;
    }
}