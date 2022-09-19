import sequelize from "sequelize";
import 'dotenv/config'

export const dbConfig = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        logging: false
    }
)