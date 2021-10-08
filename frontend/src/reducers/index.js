import { combineReducers } from 'redux';

import quantityMeasuresReducer from 'src/reducers/quantityMeasuresReducer.js';
import selectedAppReducer from 'src/reducers/selectedAppReducer.js';
import recipeCategoriesReducer from 'src/reducers/recipeCategoriesReducer.js';
import recipesReducer from 'src/reducers/recipesReducer.js';
import referencesReducer from 'src/reducers/referencesReducer.js';
import selectedRecipeReducer from 'src/reducers/selectedRecipeReducer.js';
import selectedReferenceReducer from 'src/reducers/selectedReferenceReducer';
import selectedViewReducer from 'src/reducers/selectedViewReducer.js';
import timeMeasuresReducer from 'src/reducers/timeMeasuresReducer.js';

export default combineReducers({
  quantityMeasures: quantityMeasuresReducer,
  recipeCategories: recipeCategoriesReducer,
  recipes: recipesReducer,
  references: referencesReducer,
  selectedApp: selectedAppReducer,
  selectedView: selectedViewReducer,
  selectedRecipe: selectedRecipeReducer,
  selectedReference: selectedReferenceReducer,
  timeMeasures: timeMeasuresReducer,
});
