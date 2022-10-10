import express from "express";
import {updateSetting, getAllSettingFromUser, getAllSettings} from "../controller/SettingController.mjs";

const router = express.Router();

export const settingRoutes = router

router.put('/:id', updateSetting);
router.get('/:id/:userId', getAllSettingFromUser)
router.get('/', getAllSettings)