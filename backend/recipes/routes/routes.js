import express from 'express';

import * as categoryCtrl from '../controllers/Category.js';

const recipeRouter = express.Router();

recipeRouter.get('/recipes/categories', categoryCtrl.getRecipeCategories);
recipeRouter.get('/recipes/categories/:id', categoryCtrl.getCategoryById);
recipeRouter.post('/recipes/categories', categoryCtrl.createCategory);
recipeRouter.put('/recipes/categories/:id', categoryCtrl.updateCategory);
recipeRouter.delete('/recipes/categories/:id', categoryCtrl.deleteCategory);

export default recipeRouter;
