/**
 * Updates the state property view with the the payload of the action it receives
 * @param  {String}   [state='overview']              Currently selected app
 * @param  {Object}   action                          Holds a type and a payload
 * @return {String}                                   New selected view
 */
const selectedViewReducer = (state = 'overview', action) => {
  switch (action.type) {
    case 'VIEW_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedViewReducer;
