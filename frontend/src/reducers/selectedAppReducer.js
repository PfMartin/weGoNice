const selectedAppReducer = (state = 'recipes', action) => {
  switch (action.type) {
    case 'APP_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedAppReducer;
