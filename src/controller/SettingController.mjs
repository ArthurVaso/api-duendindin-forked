import {Setting} from "../model/Setting.mjs"
import {authentication} from "../config/jwt.mjs"

export const createSetting = async (userId) => {
    try {
        let setting = {
            usuarioID:userId,
            renda_fixa:null,
            limite_lazer:20,
            limite_contas:50,
            limite_investimento: 30
        };

        const settingResponse = await Setting.create(setting);
        return settingResponse;
    } catch (error) {
        return error.message;
    }
}