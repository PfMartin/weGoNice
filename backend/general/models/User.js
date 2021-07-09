import { Sequelize } from 'sequelize';
import db from '../../config/database.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
  userName: {
    type: DataTypes.STRING, // size 255
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'generalUser'
});

export default User;
