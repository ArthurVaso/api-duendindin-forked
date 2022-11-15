import { Expense } from '../model/Expense.mjs'
import { Category } from '../model/Category.mjs'

import { verifyIsNull } from '../helpers/MainHelper.mjs'


export const getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.findAll()

        return allExpenses !== null ? res.status(200).json({ gastos: allExpenses }) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        return expense !== null ? res.status(200).json({ gasto: expense }) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllExpensesFromCategory = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: {
                categoriaID: req.params.idCategoria
            }
        })

        return expenses !== null ? res.status(200).json({ gastos: expenses }) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getExpenseFromCategory = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                categoriaID: req.params.idCategoria
            }
        })

        return expense !== null ? res.status(200).json({ gasto: expense }) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        verifyIsNull(res, expense)

        if (expense.valor !== req.body.valor) {
            const category = await Category.findOne({
                where: {
                    id: expense.categoriaID
                }
            })

            verifyIsNull(res, category)

            let calc = (new Number(category.valor) + new Number(expense.valor)) - new Number(req.body.valor)

            await category.update({
                valor: calc.toFixed(2)
            })
        }

        await expense.update(req.body)

        return res.status(200).json({ mensagem: 'Ganho atualaizado com sucesso' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        verifyIsNull(res, expense)

        const category = await Category.findOne({
            where: {
                id: expense.categoriaID
            }
        })

        verifyIsNull(res, category)

        const calc = new Number(category.valor) + new Number(expense.valor)

        await expense.destroy()

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ mensagem: 'Ganho deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const createExpense = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.body.categoriaID
            }
        })
        verifyIsNull(res, category)

        const expense = await Expense.create(req.body)

        const calc = new Number(category.valor) - new Number(expense.valor)

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ gasto: expense })

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}