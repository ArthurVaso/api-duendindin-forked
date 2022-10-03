import { Category } from '../model/Category.mjs'
import { Gain } from '../model/Gain.mjs';
import { Expense } from '../model/Expense.mjs';

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)

        return res.status(201).json(category)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getUserCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.params['id'],
                usuarioID: req.params['userId']
            }
        })

        if (category === null) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada com os dados informados.' })
        }

        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllUserCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                usuarioID: req.params['userId']
            }
        })

        if (categories === null) {
            return res.status(404).json({ mensagem: 'Não foram encontrados Categorias com os dados informados.' })
        }

        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllSystemCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();

        if (allCategories === null) {
            return res.status(404).json({ mensagem: 'Não foram encontradas categorias' })
        }

        return res.status(200).json(allCategories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.update(req.body, {
            where: {
                id: req.params['id'],
                usuarioID: req.params['userId']
            }
        })

        return category >= 1 ? res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' }) : res.status(500).json({ mensagem: 'Ocorreu um erro ao tentar atualizar a categoria'})

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findOne({
            where: {
                id: req.params.id,
                usuarioID: req.params.userId
            }
        })

        if(category === null){
            return res.status(404).json({ mensagem: "Não encontrado"})
        }
        

        const earnings = await Gain.findAll({
            where: {
                categoriaID: category.id
            }
        })

        const expense = await Expense.findAll({
            where: {
                categoriaID: category.id
            }
        })

        if(earnings === null || expense === null){
            return res.status(401).json({ mensagem: 'Não é possível deletar a categoria, existem gastos e/ou ganhos vinculados a ela'})
        }

        await category.destroy()

        console.log(category);

        return res.status(200).json({ mensagem: 'Categoria deletada com sucesso.' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}