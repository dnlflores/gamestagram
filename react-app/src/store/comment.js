const ADD_COMMENT = "comment/ADD_COMMENT";
const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
const EDIT_COMMENT = "comment/EDIT_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const loadComments = comments => ({
  type: LOAD_COMMENTS,
  payload: comments,
})

const editComment = comment => ({
  type: EDIT_COMMENT,
  payload: comment,
})

const deleteComment = comment => ({
  type: DELETE_COMMENT,
  payload: comment,
})

export const createComment = (imageId, content) => async (dispatch) => {
  const response = await fetch(`/api/games/${imageId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment));
    return newComment;
  }
};

export const getComments = () => async dispatch => {
  const response = await fetch(`/api/games/comments`);
  if(response.ok) {
    const loadedComments = await response.json();
    console.log("THIS IS THE LOADED COMMENTS", loadedComments)
    dispatch(loadComments(loadedComments));
    return loadedComments;
  }
}

export const editOneComment = (image_id, comment_id, content) => async dispatch => {
  const response = await fetch(`/api/games/${image_id}/comments/${comment_id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({ content })
  })
  if (response.ok) {
    console.log('response was ok')
    const newComment = await response.json();
    dispatch(editComment(newComment));
    return newComment;
  }

}

export const deleteOneComment = (image_id, comment_id) => async dispatch => {
  const response = await fetch(`/api/games/${image_id}/comments/${comment_id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const deletedComment = await response.json();
    dispatch(deleteComment(deletedComment));
    return deletedComment
  }
}

export default function commentReducer(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT: 
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case LOAD_COMMENTS:
      const loadState = {...state}
      action.payload.comments?.forEach(comment => loadState[comment.id] = comment);
      return loadState
    case EDIT_COMMENT:
      const editState = {...state};
      editState[action.payload.id] = action.payload;
      return editState
    case DELETE_COMMENT:
      const deleteState = {...state};
      delete deleteState[action.payload.id];
      return deleteState;
    default: {
      return state;
    }
  }
}
