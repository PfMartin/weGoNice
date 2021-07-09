import RecipeCategory from '../models/RecipeCategory.js';

/**
 * Creates recipe categories for select fields
 * @return {Promise}
 */
export const createRecipeCategories = async () => {
  await RecipeCategory.create({
    'title': 'Basics',
  });

  await RecipeCategory.create({
    'title': 'Breakfast',
  });

  await RecipeCategory.create({
    'title': 'Dessert',
  });

  await RecipeCategory.create({
    'title': 'Drinks',
  });

  await RecipeCategory.create({
    'title': 'Main',
  });

  console.log('Done.');
}
