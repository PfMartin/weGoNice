import Category from '../models/Category.js';
import Recipe from '../models/Recipe.js';

/**
 * Creates recipe categories for select fields
 * @return {Promise}
 */
export const createRecipeCategories = async () => {
  await Category.create({
    title: 'Basics',
  });

  await Category.create({
    title: 'Breakfast',
  });

  await Category.create({
    title: 'Dessert',
  });

  await Category.create({
    title: 'Drinks',
  });

  await Category.create({
    title: 'Main',
  });
};

export const createRecipes = async () => {
  await Recipe.create({
    title: 'Test Recipe',
    url: 'Test Url',
    referencesReferenceId: 1,
    recipesCategoryId: 1,
    generalValueId: 1,
  });
};
