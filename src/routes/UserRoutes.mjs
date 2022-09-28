import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, removeUserById} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/', createUser);
router.delete('/:id', verifyToken, removeUserById);

export const userRoutes = router

