import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Recipe from './Recipe.js';

const { DataTypes } = Sequelize;

const PrepStep = db.define(
  'recipesPrepStep',
  {
    title: {
      type: DataTypes.STRING,
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

PrepStep.belongsTo(Recipe); // ForeignKey to a recipe

export default PrepStep;
