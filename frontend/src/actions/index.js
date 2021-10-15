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
 * Action creator for fetching all salutations
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
const fetchSalutations = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/references/salutations');
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

module.exports = {
  fetchAcademicTitles,
  fetchSalutations,
  switchApp,
  switchView,
  selectRecipe,
  selectReference,
};
