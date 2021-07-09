import express from 'express';

import * as recipeCategoryCtrl from '../controllers/RecipeCategory.js';

const recipeRouter = express.Router();

recipeRouter.get('/recipes/recipe_categories', recipeCategoryCtrl.getRecipeCategories);
recipeRouter.get('/recipes/recipeCategories/:id', recipeCategoryCtrl.getRecipeCategoryById);
recipeRouter.post('/recipes/recipeCategories', recipeCategoryCtrl.createRecipeCategory);
recipeRouter.put('/recipes/recipeCategories/:id', recipeCategoryCtrl.updateRecipeCategory);
recipeRouter.delete('/recipes/recipeCategories/:id', recipeCategoryCtrl.deleteRecipeCategory);

export default recipeRouter;
