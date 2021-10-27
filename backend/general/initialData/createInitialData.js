import * as createFunctions from './createFunctions.js';

const createData = async () => {
  await createFunctions.createUsers();
  await createFunctions.createMeasures();
  process.exit(0);
};

createData();
