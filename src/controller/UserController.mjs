import { User } from "../model/User.mjs"
import { authentication } from "../config/jwt.mjs"
import { createSetting } from "../controller/SettingController.mjs"

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const jwt = authentication(user.id)
        createSetting(user.id)
        return res.status(201).json({
            user,
            jwt
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(500).json({ mensagemAviso: "Email já está em uso" });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}

export const inactivatedUser = async (req, res) => {
    try {
        const [updatedRows] = await User.update({
            ativo: false,
        },
            {
                where: {
                    id: req.params.id
                }
            })
        if (updatedRows) {
            res.status(200).send();
        } else {
            return res.status(404).send({ "Mensagem de Erro": "ID inválido" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        return user >= 1 ? res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' }) : res.status(500).json({ mensagem: 'Ocorreu um erro ao tentar atualizar o usuário' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getUserById = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        return user !== null ? res.status(200).json({ usuario: user }) : res.status(404).json({ message: "Usuário não encontrado" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}
export const getAllUsers = async (req, res) => {

    try {
        const user = await User.findAll()
        return user !== null ? res.status(200).json({ usuario: user }) : res.status(404).json({ message: "Não foram encontrados Usuários" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}
