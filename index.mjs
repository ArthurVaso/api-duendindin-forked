import express from 'express'
import 'dotenv/config'
import { categoryRoutes } from './src/routes/CategoryRoutes.mjs'
import { expenseRoutes } from './src/routes/ExpenseRoutes.mjs'
import { gainRoutes } from './src/routes/GainRoutes.mjs'
import { settingRoutes } from './src/routes/SettingRoutes.mjs'
import { userRoutes } from './src/routes/UserRoutes.mjs'
import { User } from './src/model/User.mjs'
import { Setting } from './src/model/Setting.mjs'
import { Gain } from './src/model/Gain.mjs'
import { Expense } from './src/model/Expense.mjs'
import { Category } from './src/model/Category.mjs'
import cors from 'cors';

const app = express()
const port = 3000

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors())

app.use("/user",userRoutes)
app.use('/category', categoryRoutes)
app.use('/expense',expenseRoutes)
app.use('/gain',gainRoutes)
app.use(settingRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ mensagem: err.message });
    return;
});

Category.belongsTo(User, {
    foreignKey: 'usuarioID'
})

Category.hasMany(Gain, {
    foreignKey: 'id'
})

Category.hasMany(Expense, {
    foreignKey: 'id'
})

Setting.belongsTo(User, {
    foreignKey: 'usuarioID'
})
Gain.belongsTo(Category, {
    foreignKey: 'categoriaID'
})
Expense.belongsTo(Category, {
    foreignKey: 'categoriaID'
})

app.listen(port, () => console.log(`API listening on port ${port}!`))
