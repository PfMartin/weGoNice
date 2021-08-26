import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Value from '../../general/models/Value.js';
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
  },
  {
    tableName: 'recipesRecipe',
  }
);

Recipe.belongsTo(Reference); // Foreign key to a reference
Recipe.belongsTo(Category); // Select field for a category
Recipe.belongsTo(Value); // Foreign key to a value (preparation time)

export default Recipe;
