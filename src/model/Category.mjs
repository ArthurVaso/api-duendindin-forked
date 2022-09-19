import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Category = dbConfig.define(
    process.env.CATEGORY_MODEL_NAME,
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        usuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(30)
        },
        descricao: {
            type: DataTypes.STRING(50)
        },
        gasto_fixo: {
            type: DataTypes.DECIMAL(10, 2)
        },
        ganho_fixo: {
            type: DataTypes.DECIMAL(10, 2)
        },
        gasto_variavel: {
            type: DataTypes.DECIMAL(10, 2)
        },
        ganho_variavel: {
            type: DataTypes.DECIMAL(10, 2)
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2)
        }
    },
    { freezeTableName: true, timestamps: false }
)