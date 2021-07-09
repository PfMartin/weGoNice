import express from 'express';

import * as usersCtrl from '../controllers/User.js';
import * as measureCtrl from '../controllers/Measure.js';
import * as timeCtrl from '../controllers/Time.js';
import * as recipeCategoryCtrl from '../controllers/RecipeCategory.js';

const router = express.Router();

router.get('/users', usersCtrl.getUsers);
router.get('/users/:id', usersCtrl.getUserById);
router.post('/users', usersCtrl.createUser);
router.put('/users/:id', usersCtrl.updateUser);
router.delete('/users/:id', usersCtrl.deleteUser);

router.get('/times', timeCtrl.getTimes);
router.get('/times/:id', timeCtrl.getTimeById);
router.post('/times', timeCtrl.createTime);
router.put('/times/:id', timeCtrl.updateTime);
router.delete('/times/:id', timeCtrl.deleteTime);

router.get('/measures', measureCtrl.getMeasures);
router.get('/measures/:id', measureCtrl.getMeasureById);
router.post('/measures', measureCtrl.createMeasure);
router.put('/measures/:id', measureCtrl.updateMeasure);
router.delete('/measures/:id', measureCtrl.deleteMeasure);

router.get('/recipe_categories', recipeCategoryCtrl.getRecipeCategories);
router.get('/recipeCategories/:id', recipeCategoryCtrl.getRecipeCategoryById);
router.post('/recipeCategories', recipeCategoryCtrl.createRecipeCategory);
router.put('/recipeCategories/:id', recipeCategoryCtrl.updateRecipeCategory);
router.delete('/recipeCategories/:id', recipeCategoryCtrl.deleteRecipeCategory);

export default router;
