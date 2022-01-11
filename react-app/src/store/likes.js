const GET_LIKES = 'likes/GET_LIKES'
const SET_LIKE = 'likes/SET_LIKE'

const getLike = likes => ({
    type: GET_LIKES,
    payload: likes,
})

const setLike = likes => ({
    type: SET_LIKE,
    payload: likes,
})

export const getTheLikes = () => async dispatch => {
    console.log('got to: getTheLikes')
    const response = await fetch('/api/likes')
    console.log('getTheLikes response', response)
    if (response.ok) {
        const likes = await response.json();
        console.log('likes in getTheLikes', likes);
        dispatch(getLike(likes));
    }
}

export const setOneLike = () => async dispatch => {
    const response = await fetch('/api/likes')
    if (response.ok) {
        const likes = await response.json();
        console.log('likes in setOneLike', likes);
        dispatch(setLike(likes));
    }
}

export default function likeReducer(state = {}, action) {
    switch (action.type) {
        case GET_LIKES:
            // const newStateA = {};
            return state;
        case SET_LIKE:
            // const newStateB = {};
            return state;
            // action.payload.likes?.forEach(like => newState[]);
        default:
            return state;
    }
}