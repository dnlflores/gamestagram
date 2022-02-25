const ADD_MESSAGE = "message/ADD_MESSAGE";

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const createMessage = (receiverId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${receiverId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const newMessage = await response.json();
    dispatch(addMessage(newMessage));
    return newMessage;
  }
};

export default function messageReducer(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      if (newState["receiver_id"] === undefined) {
        newState["receiver_id"] = [action.payload];
      } else {
        newState["receiver_id"].push(action.payload);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
}
