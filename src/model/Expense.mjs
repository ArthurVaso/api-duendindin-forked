import {DataType} from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Expense = dbConfig.define(
    process.env.EXPENSE_MODEL_NAME,
    {
        //colunas   
    }
)