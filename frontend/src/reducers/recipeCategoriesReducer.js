const staticPossibleCategories = [
  {
    id: 1,
    title: 'breakfast',
  },
  {
    id: 2,
    title: 'main',
  },
  {
    id: 3,
    title: 'basics',
  },
  {
    id: 4,
    title: 'dessert',
  },
  {
    id: 5,
    title: 'drinks',
  },
];

/**
 * Updates the state property recipeCategories with the payload of the action it receives
 * @param  {Array}    [state=staticReferences]            Current list of recipeCategories
 * @return {Array}                                        Updated list of recipeCategories
 */
const recipeCategoriesReducer = (state = staticPossibleCategories) => {
  return state;
};

export default recipeCategoriesReducer;
