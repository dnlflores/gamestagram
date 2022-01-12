const GET_LIKES = 'likes/GET_LIKES'
const SET_LIKE = 'likes/SET_LIKE'
const UN_LIKE = 'likes/UN_LIKE'

const getLike = likes => ({
    type: GET_LIKES,
    payload: likes,
})

const setLike = likes => ({
    type: SET_LIKE,
    payload: likes,
})

const unLike = likes => ({
    type: UN_LIKE,
    payload: likes,
})

export const getTheLikes = () => async dispatch => {
    const response = await fetch('/api/likes');
    if (response.ok) {
        const likes = await response.json();
        dispatch(getLike(likes));
    }
}

export const setOneLike = (image_id) => async dispatch => {
    const response = await fetch(`/api/likes/${image_id}`, {
        method: 'POST'
    })
    if (response.ok) {
        const likes = await response.json();
        dispatch(setLike(likes));
    }
}

export const unOneLike = image_id => async dispatch => {
    const response = await fetch(`/api/likes/${image_id}`, {
        method: 'DELETE'
    })
    console.log('response ok', response.ok)

    if (response.ok) {
        console.log('made it here')
        const unlike = await response.json();
        dispatch(unLike(unlike));
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
        case UN_LIKE:
            const deleting = {...state}
            delete deleting[action.payload.id];
            return deleting;
        default:
            return state;
    }
}