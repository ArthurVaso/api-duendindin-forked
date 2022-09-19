import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Expense = dbConfig.define(
    process.env.EXPENSE_MODEL_NAME,
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoriaID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(30)
        },
        recorrencia: {
            type: DataTypes.BOOLEAN
        },
        vencimento: {
            type: DataTypes.DATEONLY
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2)
        },
        descricao: {
            type: DataTypes.STRING(50)
        },
        data_pagamento: {
            type: DataTypes.DATEONLY
        }
    },
    { freezeTableName: true, timestamps: false }
)