import { Sequelize } from 'sequelize';
import db from '../../config/database.js';
import Measure from './Measure.js';

const { DataTypes } = Sequelize;

const Value = db.define(
  'generalValue',
  {
    value: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'generalValue',
  }
);

Value.belongsTo(Measure); // Select field for a measure

export default Value;
