import Category from '../models/Category.js';

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

  console.log('Done.');
};
