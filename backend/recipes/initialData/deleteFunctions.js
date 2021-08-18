import Category from '../models/Category.js';

export const deleteRecipeCategories = async () => {
  const recipeCategories = await Category.findAll();

  const categoryIds = recipeCategories.map((user) => {
    return user.id;
  });

  categoryIds.forEach((categoryId) => {
    try {
      Category.destroy({
        where: {
          id: categoryId,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });
};
