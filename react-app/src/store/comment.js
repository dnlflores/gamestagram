const ADD_COMMENT = "comment/ADD_COMMENT";

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const createComment = (imageId, comment) => async (dispatch) => {
  const response = await fetch(`/api/games/${imageId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  const newComment = await response.json();
  if (response.ok) {
    dispatch(addComment(newComment));
    return newComment;
  }
};

export default function commentReducer(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT: {
      const newState = { ...state, [action.comment.id]: action.comment };
      return newState;
    }
    default: {
      return state;
    }
  }
}
