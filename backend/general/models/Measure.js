import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const Measure = db.define('measures', {
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
  abbreviation: {
    type: DataTypes.STRING,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'generalMeasure',
});

export default Measure;
