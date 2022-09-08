import express from "express";
import { authentication, logout, refreshToken, verifyToken } from '../config/jwt.mjs'

const router = express.Router();

router.get('/', (req, res, next) => {
    const [jwt, refreshToken] = authentication(Math.random() * 1000000000)
    res.json({auth: true, token: jwt, refreshToken: refreshToken})
})

router.get('/test', verifyToken, (req, res, next) => {
    res.json({message: 'Usuário com acesso'})
})

router.post('/refresh-token', refreshToken)

router.get('/logout', verifyToken, logout)

export const authenticationRoutes = router