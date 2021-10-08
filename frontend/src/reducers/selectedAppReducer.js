/**
 * Updates the state property app with the the payload of the action it receives
 * @param  {String}   [state='recipes']               Currently selected app
 * @param  {Object}   action                          Holds a type and a payload
 * @return {String}                                   New selected app
 */
const selectedAppReducer = (state = 'recipes', action) => {
  switch (action.type) {
    case 'APP_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedAppReducer;
