import Ingredient from '../models/Ingredient.js';
import Measure from '../../general/models/Measure.js';

/**
 * Finds all ingredients in the database and returns them in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.send(ingredients);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds an ingredient with a specific id in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getIngredientById = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(ingredients[0]);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Creates a new ingredient
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const createIngredient = async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.json({
      message: 'Ingredient Created',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Updates a specific ingredient with the sent data
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const updateIngredient = async (req, res) => {
  try {
    await Ingredient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Ingredient Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Deletes a specific ingredient
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const deleteIngredient = async (req, res) => {
  try {
    await Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Ingredient Deleted',
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * Finds all ingredients associated a specific recipes in the database and returns it in json format
 * @param  {Object}  req    Request to the backend
 * @param  {Object}  res    Response from the backend
 * @return {Promise}
 */
export const getIngredientsByRecipe = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll({
      where: {
        recipesRecipeId: req.params.id,
      },
      include: [
        {
          model: Measure,
          as: 'generalMeasure',
        },
      ],
      order: [['rank', 'ASC']],
    });
    res.send(ingredients.sort((a, b) => a.rank > b.rank));
  } catch (err) {
    console.error(err);
  }
};
