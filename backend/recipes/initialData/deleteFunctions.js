import RecipeCategory from '../models/RecipeCategory.js';

export const deleteRecipeCategories = async () => {
  const recipeCategories = await RecipeCategory.findAll();

  // const userIds = recipeCategories.map((user) => {
  //   return user.id;
  // })

  console.log(recipeCategories);
}
