import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Measure from './Measure.js';

const { DataTypes } = Sequelize;

const Time = db.define('times', {
  time: {
    type: DataTypes.INTEGER,
  },
}, {
  freezeTableName: true,
});

Time.belongsTo(Measure);

export default Time;
