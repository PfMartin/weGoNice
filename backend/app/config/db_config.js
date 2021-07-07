const dbConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'postgres',
  DB: 'wegonice',
  dialect: 'postgres',
  pool: {
    max: 5,             // Maximum number of connection in pool
    min: 0,             // Minimum number of connection in pool
    acquire: 30000,     // Maximum time, in milliseconds, that pool will try to get a connection before throwing an error
    idle: 10000,        // Maximum time, in milliseconds, that a connection can be idle before being released
  },
};

module.exports = dbConfig;
