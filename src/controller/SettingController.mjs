import {Setting} from "../model/Setting.mjs"
import {authentication} from "../config/jwt.mjs"

export const createSetting = async (userId, rendaFixa) => {
    try {
        if(rendaFixa != undefined || rendaFixa != 0) {
            var rendaFixaUser = rendaFixa
        }
        let setting = {
            usuarioID:userId,
            renda_fixa:rendaFixaUser,
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