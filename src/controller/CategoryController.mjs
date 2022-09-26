import { Category } from '../model/Category.mjs'
import sequelize from "sequelize";
import { dbConfig } from '../config/db.mjs';
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
        const category = await Category.findOne({ where: {
            id: req.params['id'],
            usuarioID: req.params['userId']
        }})

        if(category === null) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada com os dados informados.' })
        }

        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message})
    }
}

export const getAllUserCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ where: {
            usuarioID: req.params['userId']
        }})

        if(categories === null){
            return res.status(404).json({ mensagem: 'Não foram encontrados Categorias com os dados informados.'})
        }

        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message})
    }
}

export const getAllSystemCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();
        
        if(allCategories === null) {
            return res.status(404).json({ mensagem: 'Não foram encontradas categorias'})
        }

        return res.status(200).json(allCategories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const result = dbConfig.transaction( async (t) => {
            const category = await Category.update(req.body, {
                where: {
                    id: req.params['id'],
                    usuarioID: req.params['userId']
                }
            }, { transaction: t })

            return category
        })

        return res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' })

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const result = await dbConfig.transaction(async (t) => {
            const category = await Category.destroy({
                where: {
                    id: req.params['id'],
                    usuarioID: req.params['userId']
                }
            }, { transaction: t })

            const earnings = await Gain.destroy({ 
                where: {
                    categoriaID: req.params['id']
                }
            }, { transaction: t })

            const spending = await Expense.destroy({ 
                where: {
                    categoriaID: req.params['id']
                }
            }, { transaction: t })
            
            return category
        })

        return result === 1 ? res.status(200).json({ mensagem: 'Categoria deletada com sucesso.'}) : res.status(401).json({ mensagem: 'Não foi possivel deletar a categoria.'})
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}