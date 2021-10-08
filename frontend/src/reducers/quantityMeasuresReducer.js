const staticQuantityMeasures = [
  {
    id: 1,
    title: 'g',
  },
  {
    id: 2,
    title: 'kg',
  },
  {
    id: 3,
    title: 'ml',
  },
  {
    id: 4,
    title: 'l',
  },
  {
    id: 5,
    title: 'pc',
  },
];

/**
 * Updates the state property quantityMeasures with the payload of the action it receives
 * @param  {Array}    [state=staticQuantityMeasures]              Current list of quantityMeasures
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of quantityMeasures
 */
const quantityMeasuresReducer = (state = staticQuantityMeasures, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default quantityMeasuresReducer;
