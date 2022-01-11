const LOAD_IMAGES = 'images/LOAD_IMAGES';
const DELETE_IMAGE = 'images/DELETE_IMAGE';
// const SET_IMAGE = 'images/SET_IMAGE';
const EDIT_IMAGE = 'images/EDIT_IMAGE';

const loadImages = (images) => ({
    type: LOAD_IMAGES,
    payload: images
})

const deleteImage = (image) => ({
    type: DELETE_IMAGE,
    payload: image,
})

const editImage = image => ({
    type: EDIT_IMAGE,
    payload: image,
})

export const getImages = () => async (dispatch) => {
    const response = await fetch('/api/games')
    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
        // return images

    } else return;
}

export const deleteOneImage = (image) => async (dispatch) => {
    const response = await fetch(`/api/games/${image.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(image)
    })
    if (response.ok) {
        const imageToDelete = await response.json();
        dispatch(deleteImage(imageToDelete))
    }
}

export const editOneImage = image => async (dispatch) => {
    console.log('image is: ', image)
    const response = await fetch(`/api/games/${image.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
    })
    if (response.ok) {
        const imageToEdit = await response.json();
        dispatch(editImage(imageToEdit))
    }
}

export default function imageReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_IMAGES:
            const newState = {}
            action.payload.images?.forEach(image => newState[image.id] = image)
            return newState
        case DELETE_IMAGE:
            const deleteState = {...state};
            delete deleteState[action.payload.id];
            return deleteState;
        case EDIT_IMAGE:
            const editState = {...state};
            editState[action.payload.id] = action.payload;
            return editState;
        default:
            return state;
    }
}
