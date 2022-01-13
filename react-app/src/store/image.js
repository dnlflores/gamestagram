const LOAD_IMAGES = 'images/LOAD_IMAGES';
const DELETE_IMAGE = 'images/DELETE_IMAGE';
const EDIT_IMAGE = 'images/EDIT_IMAGE';
const LOAD_IMAGE = 'images/LOAD_IMAGE';
const LOAD_USER_IMAGES = 'images/LOAD_USER_IMAGES';

const loadImages = (images) => ({
    type: LOAD_IMAGES,
    payload: images
});

const deleteImage = (image) => ({
    type: DELETE_IMAGE,
    payload: image
});

const editImage = image => ({
    type: EDIT_IMAGE,
    payload: image
});

const loadImage = image => ({
    type: LOAD_IMAGE,
    payload: image
});

const loadUserImages = images => ({
    type: LOAD_USER_IMAGES,
    payload: images
})

export const getImage = imageId => async dispatch => {
    const response = await fetch(`/api/games/${imageId}`);
    if (response.ok) {
        const image = await response.json();
        dispatch(loadImage(image));
        return image;
    }
}

export const getImages = () => async (dispatch) => {
    const response = await fetch('/api/games')
    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
        return images;

    } else return;
};

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
        dispatch(deleteImage(imageToDelete));
    }
};

export const editOneImage = image => async (dispatch) => {
    const response = await fetch(`/api/games/${image.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
    });
    if (response.ok) {
        const imageToEdit = await response.json();
        dispatch(editImage(imageToEdit));
        return imageToEdit;
    }
};

export const getUserImages = userId => async dispatch => {
    const response = await fetch(`/api/users/${userId}/games`);

    if(response.ok){
        const userImages = await response.json();
        console.log("THESE ARE THE USER IMAGES => ", {...userImages}.user_images);
        dispatch(loadUserImages(userImages));
        return userImages;
    }
};

export default function imageReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_IMAGES:
            const newState = {};
            action.payload.images?.forEach(image => newState[image.id] = image);
            return newState;
        case DELETE_IMAGE:
            const deleteState = {...state};
            delete deleteState[action.payload.id];
            return deleteState;
        case EDIT_IMAGE:
            const editState = {...state};
            editState[action.payload.id] = action.payload;
            return editState;
        case LOAD_USER_IMAGES:
            const loadState = {...state};
            action.payload.user_images?.forEach(image => loadState[image.id] = image);
            return loadState;
        default:
            return state;
    }
}
