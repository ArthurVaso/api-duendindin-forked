import {DataType} from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Gain = dbConfig.define(
    process.env.GAIN_MODEL_NAME,
    {
        //colunas   
    }
)