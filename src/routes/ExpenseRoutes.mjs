import express from "express";import { verifyToken } from '../config/jwt.mjs'
import { getAllExpensesFromUser, getAllExpenses, getExpense, getAllExpensesFromCategory, getExpenseFromCategory, updateExpense, deleteExpense, createExpense } from "../controller/ExpenseController.mjs";

const router = express.Router();

router.get('/', verifyToken, getAllExpenses)
router.get('/:id', verifyToken, getExpense)
router.get('/category/:idCategoria', verifyToken, getAllExpensesFromCategory)
router.get('/user/:idUsuario', verifyToken, getAllExpensesFromUser)
router.get('/:id/:idCategoria', verifyToken, getExpenseFromCategory)


router.put('/:id', verifyToken, updateExpense)

router.delete('/:id', verifyToken, deleteExpense)

router.post('/', verifyToken, createExpense)

export const expenseRoutes = router