import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const Gain = dbConfig.define(
    process.env.GAIN_MODEL_NAME,
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
        data: {
            type: DataTypes.DATEONLY
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2)
        },
        descricao: {
            type: DataTypes.STRING(50)
        },
        recorrencia: {
            type: DataTypes.BOOLEAN
        }
    },
    { freezeTableName: true, timestamps: false }
)