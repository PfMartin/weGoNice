import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

import Recipe from './Recipe.js';

const { DataTypes } = Sequelize;

const PrepStep = db.define(
  'recipePrepStep',
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'recipePrepStep',
  }
);

PrepStep.belongsTo(Recipe);

export default PrepStep;
