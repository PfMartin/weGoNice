import Recipe from '../models/Recipe.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.send(recipes);
  } catch (err) {
    console.error(err);
  }
}

export const getRecipeById = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        id: req.params.id,
      }
    });
    res.send(recipes[0]);
  } catch (err) {
    console.error(err);
  }
}

export const createRecipe = async (req, res) => {
  try {
    await Recipe.create(req.body);
    res.json({
      'message': 'Recipe created',
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateRecipe = async (req, res) => {
  try {
    await Recipe.update(req.body, {
      where: {
        id: param.req.id,
      }
    });
    res.json({
      'message': 'Recipe Updated',
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json({
      'message': 'Recipe Deleted',
    })
  } catch (err) {
    console.error(err);
  }
}
