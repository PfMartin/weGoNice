/**
 * Action creator to switch to the desired app
 * @param  {String} targetApp         App to set as selectedApp
 * @return {Object}                   Action
 */
const switchApp = (targetApp) => {
  return {
    type: 'APP_SELECTED',
    payload: targetApp,
  };
};

/**
 * Action creator to switch to the desired view
 * @param  {String} targetView        View to set as selectedView
 * @return {Object}                   Action
 */
const switchView = (targetView) => {
  return {
    type: 'VIEW_SELECTED',
    payload: targetView,
  };
};

/**
 * Action creator to select the desired recipe
 * @param  {Object} recipe            Recipe to set as selectedRecipe
 * @return {Object}                   Action
 */
const selectRecipe = (recipe) => {
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
const selectReference = (reference) => {
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
const fetchGenders = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/references/genders');
  const data = await response.json();
  dispatch({ type: 'FETCH_SALUTATIONS', payload: data });
};

/**
 * Action creator for fetching all academic titles
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
const fetchAcademicTitles = () => async (dispatch) => {
  const response = await fetch(
    'http://localhost:8000/references/academic_titles'
  );
  const data = await response.json();
  dispatch({ type: 'FETCH_ACADEMIC_TITLES', payload: data });
};

/**
 * Action creator for fetching all measures
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
const fetchMeasures = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/general/measures');
  const data = await response.json();
  dispatch({ type: 'FETCH_MEASURES', payload: data });
};

/**
 * Action creator for fetching all recipes categories
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
const fetchRecipeCategories = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/recipes/categories');
  const data = await response.json();
  dispatch({ type: 'FETCH_RECIPE_CATEGORIES', payload: data });
};

module.exports = {
  fetchAcademicTitles,
  fetchRecipeCategories,
  fetchGenders,
  fetchMeasures,
  switchApp,
  switchView,
  selectRecipe,
  selectReference,
};
