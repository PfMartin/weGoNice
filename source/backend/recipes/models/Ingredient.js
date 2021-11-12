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
    recipeSection: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipesIngredient',
  }
);

Ingredient.belongsTo(Measure); // Create column generalMeasureId
Ingredient.belongsTo(Recipe); // Create column recipesRecipeId

export default Ingredient;
