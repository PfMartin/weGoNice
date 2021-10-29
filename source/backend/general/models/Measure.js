import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const Measure = db.define(
  'generalMeasure',
  {
    title: {
      type: DataTypes.STRING, // The verbose name of the measure: Minute, Gramm, ...
      unique: true,
    },
    description: {
      type: DataTypes.STRING, // The abbreviation of the measure: min for minutes, g for gramm, ...
      unique: true,
    },
    category: {
      type: DataTypes.STRING, // Describes the measure category: Time, weight, ...
    },
  },
  {
    tableName: 'generalMeasure',
  }
);

export default Measure;
