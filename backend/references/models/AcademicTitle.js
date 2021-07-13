import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const AcademicTitle = db.define('referencesAcademicTitle', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'referencesAcademicTitle',
});

export default AcademicTitle;
