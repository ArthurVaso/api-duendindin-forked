import express from "express";
import { verifyToken } from '../config/jwt.mjs'
import { getAllEarningsFromUser, getAllEarnings, getGain, getAllEarningsFromCategory, getGainFromCategory, updateGain, deleteGain, createGain } from "../controller/GainController.mjs";

const router = express.Router();

router.get('/', verifyToken, getAllEarnings)
router.get('/:id', verifyToken, getGain)
router.get('/category/:idCategoria', verifyToken, getAllEarningsFromCategory)
router.get('/user/:idUsuario', verifyToken, getAllEarningsFromUser)
router.get('/:id/:idCategoria', verifyToken, getGainFromCategory)

router.put('/:id', verifyToken, updateGain)

router.delete('/:id', verifyToken, deleteGain)

router.post('/', verifyToken, createGain)

export const gainRoutes = router