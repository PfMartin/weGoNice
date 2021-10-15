/**
 * Updates the state property academicTitles with the payload of the action it receives
 * @param  {Array}    [state=[]]                          Current list of academicTitles
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of academicTitles
 */
const academicTitlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ACADEMIC_TITLES':
      return action.payload;
    default:
      return state;
  }
};

export default academicTitlesReducer;
