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
 * /user/{id}:
 *   get:
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
router.get('/:id', getUserById);

router.get('/getSettings/:id', verifyToken, getUsersWithTheirsSettingsById);

router.post('/login', login);

export const userRoutes = router

