import { combineReducers } from 'redux';

const selectedAppReducer = (state = 'recipes', action) => {
  switch (action.type) {
    case 'APP_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  selectedApp: selectedAppReducer,
});
