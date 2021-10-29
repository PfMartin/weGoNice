import express from 'express';

import * as categoryCtrl from '../controllers/Category.js';
import * as ingredientCtrl from '../controllers/Ingredient.js';
import * as prepStepCtrl from '../controllers/PrepStep.js';
import * as recipeCtrl from '../controllers/Recipe.js';

const recipeRouter = express.Router();

recipeRouter.get('/recipes/categories', categoryCtrl.getRecipeCategories);
recipeRouter.get('/recipes/categories/:id', categoryCtrl.getCategoryById);
recipeRouter.post('/recipes/categories', categoryCtrl.createCategory);
recipeRouter.put('/recipes/categories/:id', categoryCtrl.updateCategory);
recipeRouter.delete('/recipes/categories/:id', categoryCtrl.deleteCategory);

recipeRouter.get('/recipes/ingredients', ingredientCtrl.getIngredients);
recipeRouter.get('/recipes/ingredients/:id', ingredientCtrl.getIngredientById);
recipeRouter.post('/recipes/ingredients', ingredientCtrl.createIngredient);
recipeRouter.put('/recipes/ingredients/:id', ingredientCtrl.updateIngredient);
recipeRouter.delete(
  '/recipes/ingredients/:id',
  ingredientCtrl.deleteIngredient
);
recipeRouter.get(
  '/recipes/ingredients_by_recipe/:id',
  ingredientCtrl.getIngredientsByRecipe
);

recipeRouter.get('/recipes/prep_steps', prepStepCtrl.getPrepSteps);
recipeRouter.get('/recipes/prep_steps/:id', prepStepCtrl.getPrepStepById);
recipeRouter.post('/recipes/prep_steps', prepStepCtrl.createPrepStep);
recipeRouter.put('/recipes/prep_steps/:id', prepStepCtrl.updatePrepStep);
recipeRouter.delete('/recipes/prep_steps/:id', prepStepCtrl.deletePrepStep);
recipeRouter.get(
  '/recipes/prep_steps_by_recipe/:id',
  prepStepCtrl.getPrepStepsByRecipe
);

recipeRouter.get('/recipes/recipes', recipeCtrl.getRecipes);
recipeRouter.get('/recipes/recipes/:id', recipeCtrl.getRecipeById);
recipeRouter.post('/recipes/recipes', recipeCtrl.createRecipe);
recipeRouter.put('/recipes/recipes/:id', recipeCtrl.updateRecipe);
recipeRouter.delete('/recipes/recipes/:id', recipeCtrl.deleteRecipe);

export default recipeRouter;
