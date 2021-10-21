import * as createFunctions from './createFunctions.js';

const createData = async () => {
  // await createFunctions.createUsers();
  // await createFunctions.createMeasures();
  await createFunctions.createTestValues();
  process.exit(0);
};

createData();
