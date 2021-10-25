import { createPrepSteps, createRecipes } from './createFunctions.js';

const createData = async () => {
  // await createFunctions.createRecipeCategories();
  await createFunctions.createRecipes();
  // await createPrepSteps();
  process.exit(0);
};

createData();
