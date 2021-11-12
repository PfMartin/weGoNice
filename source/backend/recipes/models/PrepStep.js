import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Recipe from './Recipe.js';

const { DataTypes } = Sequelize;

const PrepStep = db.define(
  'recipesPrepStep',
  {
    title: {
      type: DataTypes.STRING(1000),
    },
    rank: {
      type: DataTypes.INTEGER,
    },
    recipeSection: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipesPrepStep',
  }
);

PrepStep.belongsTo(Recipe); // Create column recipesRecipeId

export default PrepStep;
