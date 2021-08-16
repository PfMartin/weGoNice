import RecipeCategory from "../models/RecipeCategory.js";

export const deleteRecipeCategories = async () => {
  const recipeCategories = await RecipeCategory.findAll();

  const recipeCategoryIds = recipeCategories.map((user) => {
    return user.id;
  });

  recipeCategoryIds.forEach((recipeCategoryId) => {
    try {
      RecipeCategory.destroy({
        where: {
          id: recipeCategoryId,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });
};
