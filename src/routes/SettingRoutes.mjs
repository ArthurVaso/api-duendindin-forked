import express from "express";
import { verifyToken } from '../config/jwt.mjs';
import {updateSetting, getAllSettingFromUser, getAllSettings} from "../controller/SettingController.mjs";

const router = express.Router();

export const settingRoutes = router

router.put('/:id', verifyToken, updateSetting);
router.get('/:userId', verifyToken, getAllSettingFromUser)
router.get('/', verifyToken, getAllSettings)