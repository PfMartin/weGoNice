import { Sequelize } from 'sequelize';
import db from '../config/database.js';

import Value from '../general/models/Value.js';
import Reference from '../references/models/Reference.js';
import Ingredient from './Ingredient.js';
import Category from './Category.js';
import PrepStep from './PrepStep.js';

const { DataTypes } = Sequelize;

const Recipe = db.define('recipesRecipe', {
  title: {
    type: DataTypes.STRING,
  },

  tableName: 'recipesRecipe',
});

Recipe.belongsTo(Reference);
Recipe.belongsTo(Category);
Recipe.belongsTo(Value); // Time field
