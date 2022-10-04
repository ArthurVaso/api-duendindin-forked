import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser, updateUser} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/', createUser);
router.patch('/:id', verifyToken, inactivatedUser);
router.put('/:id', verifyToken, updateUser);

export const userRoutes = router

