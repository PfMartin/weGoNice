import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Time from './Time.js';

const { DataTypes } = Sequelize;

const Measure = db.define('measures', {
  title: {
    type: DataTypes.STRING,
  },
  abbreviation: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true,
});

Measure.hasMany(Time);

export default Measure;
