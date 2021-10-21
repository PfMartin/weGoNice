import { fetchGetAll, fetchGetOne } from 'src/utils/fetchApi';

/**
 * Action creator to select the desired recipe
 * @param  {Object} recipe            Recipe to set as selectedRecipe
 * @return {Object}                   Action
 */
export const selectRecipe = (recipe) => {
  return {
    type: 'RECIPE_SELECTED',
    payload: recipe,
  };
};

/**
 * Action creator to select the desired reference
 * @param  {Object} reference         Recipe to set as selectedReference
 * @return {Object}                   Action
 */
export const selectReference = (reference) => {
  return {
    type: 'REFERENCE_SELECTED',
    payload: reference,
  };
};

/**
 * Action creator for fetching all genders
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchGenders = () => async (dispatch) => {
  const data = await fetchGetAll('references', 'genders');
  dispatch({ type: 'FETCH_SALUTATIONS', payload: data });
};

/**
 * Action creator for fetching all academic titles
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchAcademicTitles = () => async (dispatch) => {
  const data = await fetchGetAll('references', 'academic_titles');
  dispatch({ type: 'FETCH_ACADEMIC_TITLES', payload: data });
};

/**
 * Action creator for fetching all measures
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchMeasures = () => async (dispatch) => {
  const data = await fetchGetAll('general', 'measures');
  dispatch({ type: 'FETCH_MEASURES', payload: data });
};

/**
 * Action creator for fetching all recipes categories
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchRecipeCategories = () => async (dispatch) => {
  const data = await fetchGetAll('recipes', 'categories');
  dispatch({ type: 'FETCH_RECIPE_CATEGORIES', payload: data });
};

/**
 * Action creator for fetching all references
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchReferences = () => async (dispatch) => {
  const data = await fetchGetAll('references', 'references');
  dispatch({ type: 'FETCH_REFERENCES', payload: data });
};
