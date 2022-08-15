import {DataType} from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Category = dbConfig.define(
    process.env.CATEGORY_MODEL_NAME,
    {
        //colunas   
    }
)