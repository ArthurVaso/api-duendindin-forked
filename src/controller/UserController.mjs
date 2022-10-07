import { User } from "../model/User.mjs"
import { Setting } from "../model/Setting.mjs"
import { authentication } from "../config/jwt.mjs"
import { createSetting } from "../controller/SettingController.mjs"

import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {

        const password = req.body.senha;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        req.body.senha = hash;

        const user = await User.create(req.body);
        const jwt = authentication(user.id)

        const settingResponse = await createSetting(user.id, req.body.renda_fixa)
        return res.status(201).json({
            user,
            settingResponse,
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
        if(req.body.senha !== undefined){
            const password = req.body.senha;
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(password.toString(), salt);
    
            req.body.senha = hash;
        }
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
        const user = await User.findAll({
            where: {
              ativo: true
            },
            attributes: ['id','nome','email','data_nascimento','cidade','estado','ativo' ]
          });
        return user !== null ? res.status(200).json({ usuario: user }) : res.status(404).json({ message: "Não foram encontrados Usuários" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

export const login = async (req, res) => {
    try {
        const {email, senha} = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!user){
            return res.send("Email inválido!")    
        }
        const isValid = await bcrypt.compare(senha.toString(), user.senha.toString())
        if(!isValid){
            return res.status(500).json({ message: "Senha inválida!" }) 
        }
        
        if(!user.ativo){
            await User.update({
                ativo: true,
            },
            { where: { email: email }})
        }
        const jwt = authentication(user.id)
        createSetting(user.id)
        return res.status(200).json({
            jwt
        });
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
}

export const getUsersWithTheirsSettingsById = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: Setting,
            attributes: ['id','nome','email','data_nascimento','cidade','estado','ativo' ]
        })
        return user !== null ? res.status(200).json({ usuario: user }) : res.status(404).json({ message: "Usuário não encontrado" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
