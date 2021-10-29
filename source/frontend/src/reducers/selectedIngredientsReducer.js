const staticIngredients = [
  {
    id: 1,
    value: 150,
    measure: 'g',
    text: 'Butter',
  },
  {
    id: 2,
    value: 150,
    measure: 'g',
    text: 'Flour',
  },
  {
    id: 3,
    value: 200,
    measure: 'ml',
    text: 'Water',
  },
  {
    id: 4,
    value: 20,
    measure: 'g',
    text: 'Chocolate',
  },
  {
    id: 5,
    value: 20,
    measure: 'g',
    text: 'Ginger',
  },
  {
    id: 6,
    value: 200,
    measure: 'ml',
    text: 'Vinegar',
  },
  {
    id: 7,
    value: 50,
    measure: 'ml',
    text: 'Almond milk',
  },
  {
    id: 8,
    value: 1,
    measure: 'piece',
    text: 'Apple',
  },
  {
    id: 9,
    value: 100,
    measure: 'g',
    text: 'Rasins',
  },
];

/**
 * Updates the state property selectedIngredients with the payload of the action it receives
 * @param  {Array}    [state=staticIngredients]           Current list of selectedIngredients
 * @param  {Object}   action                              Holds a type and a payload
 * @return {Array}                                        Updated list of selectedIngredients
 */
const selectedIngredientsReducer = (state = staticIngredients, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default selectedIngredientsReducer;
