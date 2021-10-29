/**
 * Updates the state property selectedReference with the payload of the action it receives
 * @param  {Object}   [state=null]               Currently selectedReference
 * @param  {Object}   action                     Holds a type and a payload
 * @return {Object}                              Reference, which is the new selectedReference
 */
const selectedReferenceReducer = (state = null, action) => {
  switch (action.type) {
    case 'REFERENCE_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedReferenceReducer;
