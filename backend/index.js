import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import generalRouter from './general/routes/routes.js';
import recipeRouter from './recipes/routes/routes.js';

const app = express();
app.use(express.json());
app.use(cors());

db.sync();

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (err) {
  console.error(`Unable to connect to database: ${err}`);
}

app.use(generalRouter);
app.use(recipeRouter);

app.listen(8000, () => console.log(`Server running at http://localhost:8000`));
