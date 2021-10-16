import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const Gender = db.define(
  'referencesGender',
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'referencesGender',
  }
);

export default Gender;
