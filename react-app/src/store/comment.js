const ADD_COMMENT = "comment/ADD_COMMENT";

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const createComment = (imageId, content) => async (dispatch) => {
  console.log('this is the comment =>', content)
  const response = await fetch(`/api/games/${imageId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({content}),
  });
  console.log('res', response)
  const newComment = await response.json();
  console.log('this is the newComment =>', newComment)
  if (response.ok) {
    dispatch(addComment(newComment));
    return newComment;
  }
};

export default function commentReducer(state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT: {
      console.log('payload =>', action.payload)
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    default: {
      return state;
    }
  }
}
