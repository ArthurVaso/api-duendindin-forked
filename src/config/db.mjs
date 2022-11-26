import sequelize from "sequelize";
import 'dotenv/config'

export const dbConfig = new sequelize(
    'duendindindb',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: 'localhost',
        logging: true
    }
)