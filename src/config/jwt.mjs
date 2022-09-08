
import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

export const PRIVATE_KEY = process.env.SECRET
export const PRIVATE_REFRESH_KEY = process.env.REFRESH_SECRET

export const authentication = (userId) => {
    const jwt = jsonwebtoken.sign({id: userId}, PRIVATE_KEY, {
        expiresIn: 30
    })

    const refreshToken = jsonwebtoken.sign({id: userId + (Math.random() * 100)}, PRIVATE_REFRESH_KEY)

    return [jwt, refreshToken]
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token) return res.status(401).send({auth: false, message: 'Não foi fornecido um token de acesso.'})
    jsonwebtoken.verify(token, PRIVATE_KEY, function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'Falha ao autenticar o token'})

        req.userId = decoded.id
        next();
    })
}

export const refreshToken = (req, res, next) => {
    const requestRefreshToken = req.body.refreshToken
    if(!requestRefreshToken) return res.status(401).send({auth: false, message: 'Não foi fornecido um token de acesso.'})
    jsonwebtoken.verify(requestRefreshToken, PRIVATE_KEY, function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'Falha ao autenticar o token'})
    })

    const jwt = jsonwebtoken.sign({id: Math.random() * 1000}, PRIVATE_KEY, {
        expiresIn: 30
    })

    const refreshToken = jsonwebtoken.sign({id: Math.random() * 1000}, PRIVATE_REFRESH_KEY)

    res.json({token: jwt, refreshToken: refreshToken})
}

export const logout = (req, res, next) => {
    res.json({token: null, refreshToken: null})
}

