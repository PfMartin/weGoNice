/**
 * Updates the state property selectedRecipe with the payload of the action it receives
 * @param  {Object}   [state=null]               Currently selectedRecipe
 * @param  {Object}   action                     Holds a type and a payload
 * @return {Object}                              Recipe, which is the new selectedRecipe
 */
const selectedRecipeReducer = (state = null, action) => {
  switch (action.type) {
    case 'RECIPE_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

export default selectedRecipeReducer;
