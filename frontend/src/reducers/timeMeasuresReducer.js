const staticTimeMeasures = [
  {
    id: 1,
    title: 'hr',
  },
  {
    id: 2,
    title: 'min',
  },
  {
    id: 3,
    title: 's',
  },
];

/**
 * Updates the state property timeMeasures with the payload of the action it receives
 * @param  {Array}    [state=staticTimeMeasures]              Current list of timeMeasures
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of timeMeasures
 */
const timeMeasuresReducer = (state = staticTimeMeasures, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default timeMeasuresReducer;
