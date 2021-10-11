import { Sequelize } from 'sequelize';
import db from '../../config/database.js';
import Salutation from './Salutation.js';
import AcademicTitle from './AcademicTitle.js';

const { DataTypes } = Sequelize;

const Reference = db.define('referencesReference', {
  homepage: {
    type: DataTypes.STRING,
  },
  facebook: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  youtube: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});

Reference.belongsTo(Salutation); // Create column referencesSalutationId
Reference.belongsTo(AcademicTitle); // Create column referencesAcademicTitleId

export default Reference;
