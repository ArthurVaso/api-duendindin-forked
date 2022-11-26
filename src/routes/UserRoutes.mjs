import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser, updateUser, getUserById, getAllUsers, login, getUsersWithTheirsSettingsById, updateUserPassword} from "../controller/UserController.mjs";
const router = express.Router();

/**
 * @swagger
 *     definitions:
 *         Login:
 *             type: object
 *             properties:
 *                 email:
 *                     type: string
 *                     description: The user email.
 *                     example: string
 *                 senha:
 *                     type: string
 *                     description: The user passoword.
 *                     example: string
 */

router.post('/', createUser);

router.patch('/:id', verifyToken, inactivatedUser);

router.patch('/:id', verifyToken, updateUser);

router.patch('/', updateUserPassword);

router.get('/getAll', verifyToken, getAllUsers);

 /**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: ['User']
 *     summary: Retrieve a single Duendindin user.
 *     description: Retrieve a single Duendindin user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
*/
router.get('/:id', verifyToken, getUserById);

router.get('/getSettings/:id', verifyToken, getUsersWithTheirsSettingsById);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: ['User']
 *     summary: Retrieve a JWT user.
 *     description: Retrieve a JWT user.
 *     parameters:
 *         - in: body
 *           name: login
 *           schema:
 *              $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: A JWT user.
*/
router.post('/login', login);

export const userRoutes = router

