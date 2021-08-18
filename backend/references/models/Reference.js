import { Sequelize } from 'sequelize';
import db from '../../config/database.js';
import Author from './Author.js';
import ReferenceType from './ReferenceType.js';

const { DataTypes } = Sequelize;

const Reference = db.define(
  'referencesReference',
  {
    title: {
      type: DataTypes.STRING,
    },
    // Publisher and website
    publisher: {
      type: DataTypes.STRING,
    },
    // Optional and only for books
    edition: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'referencesReference',
  }
);

// M:N relationship with Author: Automatically creates the through table "References_Author"
Reference.belongsToMany(Author, { through: 'referencesReferenceAuthor' });
Reference.belongsTo(ReferenceType);

export default Reference;
