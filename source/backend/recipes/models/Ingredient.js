import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Measure from '../../general/models/Measure.js';
import Recipe from './Recipe.js';

const { DataTypes } = Sequelize;

const Ingredient = db.define(
  'recipesIngredient',
  {
    title: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.FLOAT,
    },
    rank: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'recipesIngredient',
  }
);

Ingredient.belongsTo(Measure); // Select field for a value
Ingredient.belongsTo(Recipe); // Foreign key to a recipe

export default Ingredient;
