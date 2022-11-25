import { Category } from '../model/Category.mjs'
import { Expense } from '../model/Expense.mjs'
import { Gain } from '../model/Gain.mjs'
import { Setting } from '../model/Setting.mjs'
import { dbConfig } from '../config/db.mjs'
import { verifyPeriodIsNull } from '../helpers/MainHelper.mjs'
import sequelize from 'sequelize';

export const getChart1 = async (req, res) => {
    try {
        
        const startDate = req.body.dataInicial;
        const endDate = req.body.dataFinal;
        const userId = req.body.idUsuario;

        if(!userId) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const gain = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) + cf.renda_fixa as valor
            from
                ganho gn
                inner join categoria c on (c.id = gn.categoriaID)
                inner join configuracao cf on (c.usuarioID = cf.usuarioID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const expense = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) as valor
            from
                gasto gn
                inner join categoria c on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

            const chart = {
                gain,
                expense
            }

        return res.status(200).json({ chart })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart2 = async (req, res) => {
    try {
        
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const idUsuario = req.parbody.idUsuario;

        if(!idUsuario) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const chart = await dbConfig.query(
            `select distinct
                c.nome as nome,
                count(gt.id) + count(gn.id) as qtd
            from 
                categoria c
                left join gasto gt on (c.id = gt.categoriaID)
                left join ganho gn on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${idUsuario}
            and
                (
                    (gt.data between ${startDate} and ${endDate})
                        or
                    (gn.data between ${startDate} and ${endDate})
                )
            group by
                c.nome;`
        )

        return res.status(200).json({ chart })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart3 = async (req, res) => {
    try {
        
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const idUsuario = req.parbody.idUsuario;

        if(!idUsuario) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const chart = await dbConfig.query(
            `select distinct
                c.nome as nome,
                count(gt.id) + count(gn.id) as qtd
            from 
                categoria c
                left join gasto gt on (c.id = gt.categoriaID)
                left join ganho gn on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${idUsuario}
            and
                (
                    (gt.data between ${startDate} and ${endDate})
                        or
                    (gn.data between ${startDate} and ${endDate})
                )
            group by
                c.nome;`
        )

        return res.status(200).json({ chart })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart4 = async (req, res) => {
    try {
        
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const idUsuario = req.parbody.idUsuario;

        if(!idUsuario) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const chart = await dbConfig.query(
            `select distinct
                c.nome as nome,
                count(gt.id) + count(gn.id) as qtd
            from 
                categoria c
                left join gasto gt on (c.id = gt.categoriaID)
                left join ganho gn on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${idUsuario}
            and
                (
                    (gt.data between ${startDate} and ${endDate})
                        or
                    (gn.data between ${startDate} and ${endDate})
                )
            group by
                c.nome;`,
            { type: sequelize.QueryTypes.SELECT }
        )

        return res.status(200).json({ chart })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}