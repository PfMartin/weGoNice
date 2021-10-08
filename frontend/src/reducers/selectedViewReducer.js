const selectedViewReducer = (state = 'overview', action) => {
  switch (action.type) {
    case 'VIEW_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedViewReducer;
