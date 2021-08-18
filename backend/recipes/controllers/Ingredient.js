import Ingredient from '../models/Ingredient.js';

export const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.send(ingredients);
  } catch (err) {
    console.error(err);
  }
};

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

export const createIngredient = async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.json({
      message: 'Ingredient created',
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateIngredient = async (req, res) => {
  try {
    await Ingredient.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: 'Ingredient Updated',
    });
  } catch (err) {
    console.error(err);
  }
};

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
