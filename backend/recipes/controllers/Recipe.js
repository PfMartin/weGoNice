import Recipe from '../models/Recipe.js';

/**
 * Finds all recipes in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.send(recipes);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds a recipe with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getRecipeById = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(recipes[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new recipe
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createRecipe = async (req, res) => {
  try {
    await Recipe.create(req.body);
    res.json({
      message: 'Recipe Created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific recipe with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateRecipe = async (req, res) => {
  try {
    await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Recipe Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific recipe
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Recipe Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};
