import Category from '../models/Category.js';
import Recipe from '../models/Recipe.js';
import PrepStep from '../models/PrepStep.js';

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
    generalMeasureId: 1,
    prepTimeValue: 15,
  });
};

export const createPrepSteps = async () => {
  await PrepStep.create({
    title:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et',
    recipesRecipeId: 2,
  });
  await PrepStep.create({
    title:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    recipesRecipeId: 2,
  });
  await PrepStep.create({
    title:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
    recipesRecipeId: 2,
  });
  await PrepStep.create({
    title:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,',
    recipesRecipeId: 2,
  });
};
