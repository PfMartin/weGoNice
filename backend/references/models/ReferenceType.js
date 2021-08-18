import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const ReferenceType = db.define(
  'referencesReferenceType',
  {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'referencesReferenceType',
  }
);

export default ReferenceType;
