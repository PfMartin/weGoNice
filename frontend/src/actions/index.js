// import { fetchGetAll, fetchGetOne } from 'src/utils/fetchApi';
import weGoNice from 'src/apis/weGoNice';

/**
 * Action creator for fetching all genders
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchGenders = () => async (dispatch) => {
  const response = await weGoNice.get('/references/genders');
  const data = response.data;
  dispatch({ type: 'FETCH_GENDERS', payload: data });
};

/**
 * Action creator for fetching all academic titles
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchAcademicTitles = () => async (dispatch) => {
  const response = await weGoNice.get('/references/academic_titles');
  const data = response.data;
  dispatch({ type: 'FETCH_ACADEMIC_TITLES', payload: data });
};

/**
 * Action creator for fetching all measures
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchMeasures = () => async (dispatch) => {
  const response = await weGoNice.get('/general/measures');
  const data = response.data;
  dispatch({ type: 'FETCH_MEASURES', payload: data });
};

/**
 * Action creator for fetching all recipes categories
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchRecipeCategories = () => async (dispatch) => {
  const response = await weGoNice.get('/recipes/categories');
  const data = response.data;
  dispatch({ type: 'FETCH_RECIPE_CATEGORIES', payload: data });
};

/**
 * Action creator for fetching all references
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchReferences = () => async (dispatch) => {
  const response = await weGoNice.get('/references/references');
  const data = response.data;
  dispatch({ type: 'FETCH_REFERENCES', payload: data });
};

/**
 * Action creator for fetching all recipes
 * @param  {Func}   dispatch          Function for dispatching an action
 * @return {Object}                   Action
 */
export const fetchRecipes = () => async (dispatch) => {
  const response = await weGoNice.get('/recipes/recipes');
  const data = response.data;
  dispatch({ type: 'FETCH_RECIPES', payload: data });
};
