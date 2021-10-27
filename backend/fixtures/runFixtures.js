import sequelize_fixtures from 'sequelize-fixtures';
import Measure from '../general/models/Measure.js';
import User from '../general/models/User.js';
import Category from '../recipes/models/Category.js';
import AcademicTitle from '../references/models/AcademicTitle.js';
import Gender from '../references/models/Gender.js';

const generalModels = {
  Measure: Measure,
  User: User,
};

const recipesModels = {
  Category: Category,
};

const referencesModels = {
  AcademicTitle: AcademicTitle,
  Gender: Gender,
};

const createGeneralFixtures = async () => {
  await sequelize_fixtures.loadFile('generalFixtures.yml', generalModels);
  console.log('---> General Fixtures done');
};

const createRecipesFixtures = async () => {
  await sequelize_fixtures.loadFile('recipesFixtures.yml', recipesModels);
  console.log('---> Recipes Fixtures done');
};

const createReferencesFixtures = async () => {
  await sequelize_fixtures.loadFile('referencesFixtures.yml', referencesModels);
  console.log('---> Recipes Fixtures done');
};

const main = async () => {
  await createGeneralFixtures();
  await createRecipesFixtures();
  await createReferencesFixtures();
  process.exit(0);
};

main();
