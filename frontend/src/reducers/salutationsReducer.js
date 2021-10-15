/**
 * Updates the state property saluations with the payload of the action it receives
 * @param  {Array}    [state=[]]                          Current list of saluations
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of saluations
 */
const saluationReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SALUTATIONS':
      return action.payload;
    default:
      return state;
  }
};

export default saluationReducer;
