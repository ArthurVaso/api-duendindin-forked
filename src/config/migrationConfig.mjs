
import 'dotenv/config'

export default {
  development: {
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