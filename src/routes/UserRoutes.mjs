import express from "express";
import { verifyToken } from "../config/jwt.mjs";
import {createUser, inactivatedUser} from "../controller/UserController.mjs";
const router = express.Router();


router.post('/', createUser);
router.patch('/:id', verifyToken, inactivatedUser);

export const userRoutes = router

