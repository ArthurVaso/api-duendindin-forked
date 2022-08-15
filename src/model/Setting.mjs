import {DataType} from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Setting = dbConfig.define(
    process.env.SETTING_MODEL_NAME,
    {
        //colunas   
    }
)