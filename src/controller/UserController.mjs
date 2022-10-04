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
    }catch(error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(500).json({ mensagemAviso: "Email já está em uso" });
        }  else {
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
            return res.status(404).send({ "Mensagem de Erro" : "ID inválido" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}