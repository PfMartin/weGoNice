import RecipeCategory from '../models/RecipeCategory.js';

export const getRecipeCategories = async (req, res) => {
  try {
    const recipeCategories = await RecipeCategory.findAll();
    res.send(recipeCategories);
  } catch (err) {
    console.error(err);
  }
}

export const getRecipeCategoryById = async (req, res) => {
  try {
    const recipeCategories = await RecipeCategory.findAll({
      where: {
        id: req.params.id,
      }
    });
    res.send(recipeCategories[0]);
  } catch (err) {
    console.error(err);
  }
}

export const createRecipeCategory = async (req, res) => {
  try {
    await RecipeCategory.create(req.body);
    res.json({
      'message': 'RecipeCategory created',
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateRecipeCategory = async (req, res) => {
  try {
    await RecipeCategory.update(req.body, {
      where: {
        id: param.req.id,
      }
    });
    res.json({
      'message': 'RecipeCategory Updated',
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteRecipeCategory = async (req, res) => {
  try {
    await RecipeCategory.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json({
      'message': 'RecipeCategory Deleted',
    })
  } catch (err) {
    console.error(err);
  }
}
