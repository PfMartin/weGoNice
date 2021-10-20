import { combineReducers } from 'redux';

import recipesReducer from 'src/reducers/recipesReducer';
import referencesReducer from 'src/reducers/referencesReducer';
import selectDataReducer from 'src/reducers/selectDataReducer';
import selectedIngredientsReducer from 'src/reducers/selectedIngredientsReducer';
import selectedPrepStepsReducer from 'src/reducers/selectedPrepStepsReducer';
import selectedRecipeReducer from 'src/reducers/selectedRecipeReducer';
import selectedReferenceReducer from 'src/reducers/selectedReferenceReducer';
import selectedViewReducer from 'src/reducers/selectedViewReducer';

export default combineReducers({
  recipes: recipesReducer,
  references: referencesReducer,
  selectData: selectDataReducer,
  selectedIngredients: selectedIngredientsReducer,
  selectedPrepSteps: selectedPrepStepsReducer,
  selectedView: selectedViewReducer,
  selectedRecipe: selectedRecipeReducer,
  selectedReference: selectedReferenceReducer,
});
