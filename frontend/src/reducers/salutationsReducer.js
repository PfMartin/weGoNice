const staticSalutations = [
  {
    id: 1,
    title: '---',
  },
  {
    id: 2,
    title: 'Mrs.',
  },
  {
    id: 3,
    title: 'Ms.',
  },
  {
    id: 4,
    title: 'Mr.',
  },
  {
    id: 5,
    title: 'Div.',
  },
];

/**
 * Updates the state property saluations with the payload of the action it receives
 * @param  {Array}    [state=staticSaluations]            Current list of saluations
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of saluations
 */
const saluationReducer = (state = staticSalutations, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default saluationReducer;
