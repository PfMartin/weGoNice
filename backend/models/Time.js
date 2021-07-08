import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Time = db.define('times', {
  time: {
    type: DataTypes.INTEGER,
  },
}, {
  freezeTableName: true,
});


export default Time;
