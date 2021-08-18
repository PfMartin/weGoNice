import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Value from '../../general/models/Value.js';
import Recipe from './Recipe.js';

const { DataTypes } = Sequelize;

const Ingredient = db.define(
  'recipesIngredient',
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipesIngredient',
  }
);

Ingredient.belongsTo(Value);
Ingredient.belongsTo(Recipe);

export default Ingredient;
