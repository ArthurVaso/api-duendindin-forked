import { Gain } from '../model/Gain.mjs'
import { Category } from '../model/Category.mjs'

import { verifyIsNull } from '../helpers/MainHelper.mjs'


export const getAllEarnings = async (req, res) => {
    try {
        const allEarnings = await Gain.findAll()

        return allEarnings !== null ? res.status(200).json({ ganhos: allEarnings }) : res.status(404).json({ message: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const getGain = async (req, res) => {
    try {
        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        return gain !== null ? res.status(200).json({ ganho: gain }) : res.status(404).json({ message: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const getAllEarningsFromCategory = async (req, res) => {
    try {
        const earnings = await Gain.findAll({
            where: {
                categoriaID: req.params.idCategoria
            }
        })

        return earnings !== null ? res.status(200).json({ ganhos: earnings }) : res.status(404).json({ message: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const getGainFromCategory = async (req, res) => {
    try {
        const gain = await Gain.findOne({
            where: {
                id: req.params.id,
                categoriaID: req.params.idCategoria
            }
        })

        return gain !== null ? res.status(200).json({ ganho: gain }) : res.status(404).json({ message: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateGain = async (req, res) => {
    try {
        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        verifyIsNull(res, gain)

        if (gain.valor !== req.body.valor) {
            const category = await Category.findOne({
                where: {
                    id: gain.categoriaID
                }
            })

            verifyIsNull(res, category)

            let calc = (new Number(category.valor) - new Number(gain.valor)) + new Number(req.body.valor)

            await category.update({
                valor: calc.toFixed(2)
            })
        }

        await gain.update(req.body)

        return res.status(200).json({ message: 'Ganho atualaizado com sucesso' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const deleteGain = async (req, res) => {
    try {
        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        verifyIsNull(res, gain)

        const category = await Category.findOne({
            where: {
                id: gain.categoriaID
            }
        })

        verifyIsNull(res, category)

        const calc = new Number(category.valor) - new Number(gain.valor)

        await gain.destroy()

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ message: 'Ganho deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const createGain = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                id: req.body.categoriaID
            }
        })
        verifyIsNull(res, category)

        const gain = await Gain.create(req.body)

        const calc = new Number(category.valor) + new Number(gain.valor)

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ ganho: gain })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}