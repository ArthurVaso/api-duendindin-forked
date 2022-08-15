import express from 'express'
import 'dotenv/config'
import { categoryRoutes } from './src/routes/CategoryRoutes.mjs'
import { expenseRoutes } from './src/routes/ExpenseRoutes.mjs'
import { gainRoutes } from './src/routes/GainRoutes.mjs'
import { settingRoutes } from './src/routes/SettingRoutes.mjs'
import { userRoutes } from './src/routes/UserRoutes.mjs'
import { dbConfig } from './src/config/db.mjs'

const app = express()
const port = process.env.APP_PORT

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(userRoutes)
app.use(categoryRoutes)
app.use(expenseRoutes)
app.use(gainRoutes)
app.use(settingRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

dbConfig.sync()

app.listen(port, () => console.log(`API listening on port ${port}!`))