import express from 'express';

import * as recipeCategoryCtrl from '../controllers/RecipeCategory.js';

const referenceRouter = express.Router();

referenceRouter.get('/recipes/recipe_categories', recipeCategoryCtrl.getRecipeCategories);
referenceRouter.get('/recipes/recipe_categories/:id', recipeCategoryCtrl.getRecipeCategoryById);
referenceRouter.post('/recipes/recipe_categories', recipeCategoryCtrl.createRecipeCategory);
referenceRouter.put('/recipes/recipe_categories/:id', recipeCategoryCtrl.updateRecipeCategory);
referenceRouter.delete('/recipes/recipe_categories/:id', recipeCategoryCtrl.deleteRecipeCategory);

export default referenceRouter;
