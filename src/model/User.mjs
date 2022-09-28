import { DataTypes } from "sequelize"
import { dbConfig } from "../config/db.mjs"
import 'dotenv/config'

export const User = dbConfig.define(
    process.env.USER_MODEL_NAME,
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(30)
        },
        email: {
            type: DataTypes.STRING(30),
            unique: true
        },
        senha: {
            type: DataTypes.STRING(50)
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
        },
        cidade: {
            type: DataTypes.STRING(50)
        },
        estado: {
            type: DataTypes.CHAR(4)
        }
    },
    { freezeTableName: true, timestamps: false }
)

