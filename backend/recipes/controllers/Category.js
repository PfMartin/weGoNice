import Category from "../models/Category.js";

export const getRecipeCategories = async (req, res) => {
  try {
    const recipeCategories = await Category.findAll();
    res.send(recipeCategories);
  } catch (err) {
    console.error(err);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const recipeCategories = await Category.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(recipeCategories[0]);
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = async (req, res) => {
  try {
    await Category.create(req.body);
    res.json({
      message: "Category created",
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateCategory = async (req, res) => {
  try {
    await Category.update(req.body, {
      where: {
        id: param.req.id,
      },
    });
    res.json({
      message: "Category Updated",
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Category Deleted",
    });
  } catch (err) {
    console.error(err);
  }
};
