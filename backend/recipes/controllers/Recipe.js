import Recipe from '../models/Recipe.js';
import Category from '../models/Category.js';
import Value from '../../general/models/Value.js';
import Measure from '../../general/models/Measure.js';
import Reference from '../../references/models/Reference.js';

/**
 * Finds all recipes in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Category,
          as: 'recipesCategory',
        },

        {
          model: Measure,
          as: 'generalMeasure',
        },
        {
          model: Reference,
          as: 'referencesReference',
        },
      ],
    });
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
      include: [
        {
          model: Category,
          as: 'recipesCategory',
        },
        {
          model: Value,
          as: 'generalValue',
          include: [
            {
              model: Measure,
              as: 'generalMeasure',
            },
          ],
        },
        {
          model: Reference,
          as: 'referencesReference',
        },
      ],
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
