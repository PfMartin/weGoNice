import * as createFunctions from './createFunctions.js';

const createData = async () => {
  // await createFunctions.createRecipeCategories();
  await createFunctions.createRecipes();
  process.exit(0);
};

createData();
