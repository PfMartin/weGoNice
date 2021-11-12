import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Measure from '../../general/models/Measure.js';
import Reference from '../../references/models/Reference.js';
import Category from './Category.js';

const { DataTypes } = Sequelize;

const Recipe = db.define(
  'recipesRecipe',
  {
    title: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    prepTimeValue: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'recipesRecipe',
  }
);

Recipe.belongsTo(Reference); // Create column referencesReferenceId
Recipe.belongsTo(Category); // Create column recipesCategoryId
Recipe.belongsTo(Measure); // Create column generalMeasureId

export default Recipe;
