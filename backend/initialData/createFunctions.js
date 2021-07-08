import User from '../models/User.js';
import Measure from '../models/Measure.js';
import RecipeCategory from '../models/RecipeCategory.js';

export const createUsers = async () => {
  await User.create({
    'first_name': 'Martin',
    'last_name': 'Pfatrisch',
    'user_name': 'martin',
  })

  console.log('Done.');
}

/**
 * Creates time measures for select fields
 * @return {Promise}
 */
export const createMeasures = async () => {
  await Measure.create({
    'title': 'Seconds',
    'abbreviation': 'sec',
    'category': 'time',
  });

  await Measure.create({
    'title': 'Minutes',
    'abbreviation': 'min',
    'category': 'time',
  });

  await Measure.create({
    'title': 'Hours',
    'abbreviation': 'h',
    'category': 'time',
  });

  console.log('Done.');
}


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
