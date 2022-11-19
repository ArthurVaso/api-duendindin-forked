
import 'dotenv/config'

export default {
  development: {
    username: 'root',
    password: 'root',
    database: 'duendindindb',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};