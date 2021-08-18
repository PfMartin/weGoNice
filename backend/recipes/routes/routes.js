import express from "express";

import * as categoryCtrl from "../controllers/Category.js";

const referenceRouter = express.Router();

referenceRouter.get("/recipes/categories", categoryCtrl.getRecipeCategories);
referenceRouter.get("/recipes/categories/:id", categoryCtrl.getCategoryById);
referenceRouter.post("/recipes/categories", categoryCtrl.createCategory);
referenceRouter.put("/recipes/categories/:id", categoryCtrl.updateCategory);
referenceRouter.delete("/recipes/categories/:id", categoryCtrl.deleteCategory);

export default referenceRouter;
