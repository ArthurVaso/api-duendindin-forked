import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser, updateUser, getUserById, getAllUsers, login, getUsersWithTheirsSettingsById, updateUserPassword} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/', createUser);

router.patch('/:id', verifyToken, inactivatedUser);

router.put('/:id', verifyToken, updateUser);

router.patch('/', updateUserPassword);

router.get('/getAll', verifyToken, getAllUsers);

/**
 * @swagger
 *  /user/{id}:
 *      get: 
 *          summary: Consulta o usuario pelo id
 *          produces:
 *              - application/json
 *          responses: 
 *              201: 
 *                  description: A sucessful created
 *              500:
 *                  description: Invalid
 */
router.get('/:id', getUserById);

router.get('/getSettings/:id', verifyToken, getUsersWithTheirsSettingsById);

router.post('/login', login);

export const userRoutes = router

