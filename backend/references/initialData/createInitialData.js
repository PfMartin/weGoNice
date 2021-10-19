import * as createFunctions from './createFunctions.js';

const createData = async () => {
  await createFunctions.createAcademicTitles();
  await createFunctions.createGenders();
  process.exit(0);
};

createData();
