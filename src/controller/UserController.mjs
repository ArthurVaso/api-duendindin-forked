import {User} from "../model/User.mjs"
import {authentication} from "../config/jwt.mjs"
import {createSetting} from "../controller/SettingController.mjs"

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
        return res.status(500).json({ error: error.message });
    }
}