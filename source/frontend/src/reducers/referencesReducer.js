/**
 * Updates the state property references with the payload of the action it receives
 * @param  {Array}    [state=[]]            Current list of references
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of references
 */
const referencesReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_REFERENCES':
      return action.payload;
    default:
      return state;
  }
};

export default referencesReducer;
