import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser, updateUser, getUserById} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/', createUser);
router.patch('/:id', verifyToken, inactivatedUser);
router.put('/:id', verifyToken, updateUser);
router.get('/:id', verifyToken, getUserById);

export const userRoutes = router

