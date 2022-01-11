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
    const response = await fetch('/api/likes')
    if (response.ok) {
        const likes = await response.json();
        dispatch(getLike(likes));
    }
}

export const setOneLike = (image_id) => async dispatch => {
    const response = await fetch(`/api/likes/${image_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image_id)
    })
    if (response.ok) {
        const likes = await response.json();
        dispatch(setLike(likes));
    }
}

export default function likeReducer(state = {}, action) {
    switch (action.type) {
        case GET_LIKES:
            const newState = {};
            action.payload.likes?.forEach(like => newState[like.id] = like)
            return newState;
        case SET_LIKE:
            return {...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
}