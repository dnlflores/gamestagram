const LOAD_IMAGES = 'images/LOAD_IMAGES';
// const SET_IMAGE = 'images/SET_IMAGE';

const loadImages = (images) => ({
    type: LOAD_IMAGES,
    payload: images
})

export const getImages = () => async (dispatch) => {
    const response = await fetch('/api/games')
    if (response.ok) {
        const images = await response.json();
        dispatch(loadImages(images));
        // return images

    } else return;

}

export default function imageReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_IMAGES:
            const newState = {}
            action.payload.images?.forEach(image => newState[image.id] = image)
            return newState
        default:
            return state;
    }
}