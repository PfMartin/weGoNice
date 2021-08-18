import { Sequelize } from 'sequelize';
import db from '../../config/database.js';
import AcademicTitle from './AcademicTitle.js';
import Salutation from './Salutation.js';

const { DataTypes } = Sequelize;

const Author = db.define(
  'referencesAuthor',
  {
    lastName: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'referencesAuthor',
  }
);

Author.belongsTo(AcademicTitle); // Select field for an academic title
Author.belongsTo(Salutation); // Select field for a salutation

export default Author;
