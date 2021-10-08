import { combineReducers } from 'redux';
import selectedAppReducer from 'src/reducers/selectedAppReducer.js';
import selectedRecipeReducer from 'src/reducers/selectedRecipeReducer.js';
import selectedReferenceReducer from 'src/reducers/selectedReferenceReducer';
import selectedViewReducer from 'src/reducers/selectedViewReducer.js';
import recipesReducer from 'src/reducers/recipesReducer.js';
import referencesReducer from 'src/reducers/referencesReducer.js';

export default combineReducers({
  recipes: recipesReducer,
  references: referencesReducer,
  selectedApp: selectedAppReducer,
  selectedView: selectedViewReducer,
  selectedRecipe: selectedRecipeReducer,
  selectedReference: selectedReferenceReducer,
});
