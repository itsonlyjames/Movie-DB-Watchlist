const initialState = {
  User: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        User: action.user
      };
    default:
      return state;
  }
};

export default reducers;
