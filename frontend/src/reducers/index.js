import { combineReducers } from 'redux';
import selectedAppReducer from 'src/reducers/selectedAppReducer.js';
import selectedViewReducer from 'src/reducers/selectedViewReducer.js';
import recipesReducer from 'src/reducers/recipesReducer.js';
import selectedRecipeReducer from 'src/reducers/selectedRecipeReducer.js';

export default combineReducers({
  selectedApp: selectedAppReducer,
  selectedView: selectedViewReducer,
  recipes: recipesReducer,
  selectedRecipe: selectedRecipeReducer,
});
