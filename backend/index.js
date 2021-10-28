import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import generalRouter from './general/routes/routes.js';
import recipeRouter from './recipes/routes/routes.js';
import referenceRouter from './references/routes/routes.js';
import createFixtures from './fixtures/runFixtures.js';

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database, migrate database and add fixtures
try {
  await db.authenticate();
  console.log('Connection has been established successfully.');

  await db.sync({ alter: true });
  createFixtures();
} catch (err) {
  console.error(`Unable to connect to database: ${err}`);
}

app.use(generalRouter);
app.use(recipeRouter);
app.use(referenceRouter);

app.listen(8000, () => console.log(`Server running at http://localhost:8000`));
