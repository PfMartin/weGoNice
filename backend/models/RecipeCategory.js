import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const RecipeCategory = db.define('recipeCategory', {
  title: {
    type: DataTypes.STRING,
    unique: true,
  }
});

export default RecipeCategory;
