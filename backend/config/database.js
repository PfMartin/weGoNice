import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    };
  }
  return {
    database: 'wegonice',
    user: 'postgres',
    password: 'postgres',
  };
};

const config = await getConfig();

const db = new Sequelize(config.database, config.user, config.password, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: true,
});

export default db;
