import {DataType} from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const User = dbConfig.define(
    process.env.USER_MODEL_NAME,
    {
        //colunas   
    }
)